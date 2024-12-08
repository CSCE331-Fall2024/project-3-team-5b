import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Button, CircularProgress } from '@mui/material';
import { useFetchData } from '../../../api/useFetchData';
import MenuItemEditForm from './MenuItemEditForm';
import Navbar from '../../Authentication/Navbar';
import './ManagerMenuItems.css';

/**
 * ManagerMenuItems is a React component that allows the management of menu items.
 * It displays a table of menu items with options to edit, delete, or add new items.
 */
export const ManagerMenuItems = () => {
    const { data: menuItemsData, loading, error, refetch } = useFetchData("menu-items");
    const [editRow, setEditRow] = useState(null);
    const [createRow, setCreateRow] = useState(null);
    const [newImage, setNewImage] = useState(null);

    const baseUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : import.meta.env.VITE_POS_API_BASE_URL;
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_MENU_ITEM_PRESET;

    /**
     * Handles the click event for editing a menu item.
     * @param {Object} row - The row data for the menu item to be edited.
     */
    const handleEditClick = (row) => {
        setEditRow(row);
        setNewImage(null); // Reset new image state
    };

    /**
     * Utility to extract the public_id from a Cloudinary URL.
     * @param {string} publicId - The Cloudinary URL.
     * @returns {string} - The extracted public_id without the version or file extension.
     */
    const extractPublicId = (publicId) => {
        const parts = publicId.split('/');
        const startIndex = parts.findIndex((part) => part === 'MenuItem');
        const cleanId = parts.slice(startIndex).join('/');
        return cleanId.replace(/\.[^/.]+$/, ''); // Remove the file extension
    };
    
    /**
     * Handles the click event for deleting a menu item.
     * @param {Object} row - The row data for the menu item to be deleted.
     */
    const handleDeleteClick = async (row) => {
        const isSure = window.confirm("Are you sure you want to delete this item?");
        if (!isSure) return;

        try {
            const imagePublicId = extractPublicId(row.image); // Extract the Cloudinary public_id from the image URL

            await fetch(`${baseUrl}/api/delete-image`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ public_id: imagePublicId }),
            });

            await fetch(`${baseUrl}/api/menu-items/${row.id}`, { method: 'DELETE' });
            refetch(); // Refetch data after deletion
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };

    /**
     * Prepares a new menu item row to be created.
     */
    const handleCreateClick = () => {
        setCreateRow({
            name: "",
            base_price: 0.0,
            description: "",
            maxentrees: null,
            maxsides: null,
            hasdrink: false,
            image: null,
        });
    };

    /**
     * Handles the creation of a new menu item.
     */
    const handleCreateMenuItem = async () => {
        try {
            let uploadedImageUrl = null;
    
            if (newImage) {
                const formData = new FormData();
                formData.append("file", newImage);
                formData.append("upload_preset", uploadPreset);

                const customFilename = createRow.name
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join("");

                formData.append("public_id", `MenuItem/${customFilename}`);
    
                const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    method: "POST",
                    body: formData,
                });
    
                const data = await response.json();
                uploadedImageUrl = data.secure_url; // Get the Cloudinary URL
            }
    
            const newRow = {
                ...createRow,
                image: uploadedImageUrl, // Use the uploaded Cloudinary URL
            };
    
            await fetch(`${baseUrl}/api/menu-items`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newRow),
            });
    
            refetch();
            setCreateRow(null); // Close the create panel
            setNewImage(null); // Reset new image
        } catch (error) {
            console.error("Failed to create menu item:", error);
        }
    };    

    /**
     * Cancels the creation of a new menu item.
     */
    const handleCreateCancel = () => {
        setCreateRow(null);
    };

    /**
     * Handles the image upload process.
     * @param {Object} event - The event triggered by selecting an image.
     */
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setNewImage(file); // Save the file locally
    };    

    /**
     * Saves changes made to an existing menu item.
     */
    const handleSaveChanges = async () => {
        try {
            let uploadedImageUrl = editRow.image; // Default to the existing image URL
    
            if (newImage) {
                const formData = new FormData();
                formData.append("file", newImage);
                formData.append("upload_preset", uploadPreset);

                const customFilename = editRow.name
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join("");

                formData.append("public_id", `MenuItem/${customFilename}`);
    
                const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    method: "POST",
                    body: formData,
                });
    
                const data = await response.json();
                uploadedImageUrl = data.secure_url; // Get the Cloudinary URL
            }
    
            const updatedRow = {
                ...editRow,
                image: uploadedImageUrl, // Use the new Cloudinary URL if available
            };
    
            await fetch(`${baseUrl}/api/menu-items/${editRow.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedRow),
            });
    
            refetch();
            setEditRow(null); // Close the edit panel
            setNewImage(null); // Reset new image
        } catch (error) {
            console.error("Failed to save changes:", error);
        }
    };

    /**
     * Cancels the edit process and closes the edit panel.
     */
    const handleCancel = () => {
        setEditRow(null);
    };

    const columns = [
        { field: 'id', headerName: 'ID', type: 'number', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'base_price', headerName: 'Base Price', type: 'number', width: 100},
        {
            field: 'description',
            headerName: 'Description',
            width: 200,
            renderCell: (params) => <div>{params.row.description || "No Description"}</div>,
        },
        {
            field: 'image',
            headerName: 'Image',
            sortable: false,
            width: 160,
            renderCell: (params) =>
                params.row.image ? (
                    <img
                        src={params.row.image}
                        alt={params.row.name}
                        style={{ width: '150px', height: '100px', objectFit: 'cover' }}
                    />
                ) : (
                    "No Image"
                ),
        },
        { field: 'maxentrees', headerName: 'Max Entrees', type: 'number', width: 100, renderCell: (params) => <div>{params.row.maxentrees || "N/A"}</div> },
        { field: 'maxsides', headerName: 'Max Sides', type: 'number', width: 100, renderCell: (params) => <div>{params.row.maxsides || "N/A"}</div> },
        {
            field: 'hasdrink',
            headerName: 'Has Drink',
            width: 100,
            renderCell: (params) => (
                <span style={{ fontSize: '1.5rem' }} aria-label={params.row.hasdrink ? 'Yes' : 'No'}>
                    {params.row.hasdrink ? '✅' : '❌'}
                </span>
            ),
        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 120,
            renderCell: (params) => (
                <Button className='edit-button' variant="contained" color="primary" onClick={() => handleEditClick(params.row)}>
                    Edit
                </Button>
            ),
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 120,
            renderCell: (params) => (
                <Button className='delete-button' variant="contained" sx={{bgcolor: "red", "&:hover": {bgcolor: "darkred",},}} onClick={() => handleDeleteClick(params.row)}>
                    Delete
                </Button>
            ),
        },
    ];

    if (loading) return <CircularProgress />;
    const paginationModel = { page: 0, pageSize: 5 };
    return (
        <>
            <div className='mb-4'>
                <Navbar backLink={"/manage-stuff/menu/"}/>
                <h1 className='text-white text-4xl mt-4'>Manage Menu Items</h1>
            </div>
            <Paper sx={{ height: '80%', width: '100%', position: 'relative' }}>
                <DataGrid
                    className='table'
                    rows={menuItemsData}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    sx={{ border: 0 }}
                    rowHeight={100}
                />
                {editRow && (
                    <MenuItemEditForm
                        rowData={editRow}
                        title={`Edit Item ID ${editRow.id}`}
                        onSave={handleSaveChanges}
                        onCancel={handleCancel}
                        onChange={setEditRow}
                        newImage={newImage}
                        setNewImage={setNewImage}
                        handleImageUpload={handleImageUpload}
                    />
                )}
                {createRow && (
                    <MenuItemEditForm
                        rowData={createRow}
                        title={`Create Menu Item`}
                        onSave={handleCreateMenuItem}
                        onCancel={handleCreateCancel}
                        onChange={setCreateRow}
                        newImage={newImage}
                        setNewImage={setNewImage}
                        handleImageUpload={handleImageUpload}
                    />
                )}
                <Button
                    className='add-button'
                    variant="contained"
                    sx={{
                        bgcolor: "green",
                        color: "white",
                        "&:hover": {
                            bgcolor: "darkgreen",
                        },
                        mb: 2,
                    }}
                    onClick={() => handleCreateClick()}
                >
                    Add
                </Button>
            </Paper>
        </>
    );
};
