import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import prop-types for validation
import {
    Box,
    Typography,
    TextField,
    Button,
    Switch,
} from "@mui/material";
import "./MenuItemEditForm.css";

/**
 * MenuItemEditForm component allows editing of a menu item's details, including name, price, description, and image.
 * It includes functionality to save changes, cancel edits, and upload a new image.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.rowData - The current data for the menu item to edit.
 * @param {string} props.rowData.name - The name of the menu item.
 * @param {number|string} props.rowData.base_price - The base price of the menu item.
 * @param {string} props.rowData.description - A description of the menu item.
 * @param {number|string|null} props.rowData.maxentrees - The maximum number of entrees allowed for the item.
 * @param {number|string|null} props.rowData.maxsides - The maximum number of sides allowed for the item.
 * @param {boolean} props.rowData.hasdrink - Whether the menu item includes a drink.
 * @param {string|null} props.rowData.image - The URL of the current image associated with the menu item.
 * @param {function} props.onSave - The function to call when the "Save" button is clicked.
 * @param {function} props.onCancel - The function to call when the "Cancel" button is clicked.
 * @param {function} props.onChange - The function to call when a field value changes.
 * @param {string} props.title - The title of the form (e.g., "Edit Menu Item").
 * @param {string|null} props.newImage - The new image file selected by the user.
 * @param {function} props.handleImageUpload - The function to handle image upload.
 *
 * @returns {JSX.Element} The rendered form for editing a menu item.
 */
const MenuItemEditForm = ({
    rowData,
    onSave,
    onCancel,
    onChange,
    title,
    newImage,
    setNewImage,
    handleImageUpload,
}) => {
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (newImage) {
            const previewUrl = URL.createObjectURL(newImage); // Create a temporary URL for the file
            setImagePreview(previewUrl); // Save the URL in state
        }
    }, [newImage]);

    /**
     * Clears the selected image and resets the image-related state.
     */
    const handleRemoveImage = () => {
        setImagePreview(null);
        setNewImage(null);
        onChange({ ...rowData, image: null }); // Clear the image in rowData
    };

    return (
        <Box
            className="edit-container"
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                bgcolor: "background.paper",
                boxShadow: 4,
                padding: 3,
                zIndex: 5,
            }}
        >
            <h2>{title}</h2>
            <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={rowData.name}
                onChange={(e) => onChange({ ...rowData, name: e.target.value })}
            />
            <TextField
                label="Base Price"
                fullWidth
                margin="normal"
                value={rowData.base_price}
                onChange={(e) =>
                    onChange({ ...rowData, base_price: e.target.value })
                }
            />
            <TextField
                label="Description"
                fullWidth
                margin="normal"
                value={rowData.description}
                onChange={(e) =>
                    onChange({ ...rowData, description: e.target.value })
                }
            />
            <Box mt={2}>
                <Typography>Upload New Image:</Typography>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ marginTop: "8px" }}
                />
                <Box mt={2}>
                    {newImage ? (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            style={{
                                marginTop: "8px",
                                width: "150px",
                                height: "100px",
                                objectFit: "cover",
                                border: "1px solid #ccc",
                            }}
                        />
                    ) : rowData.image ? (
                        <img
                            src={rowData.image}
                            alt="Current"
                            style={{
                                marginTop: "8px",
                                width: "150px",
                                height: "100px",
                                objectFit: "cover",
                                border: "1px solid #ccc",
                            }}
                        />
                    ) : (
                        <Typography style={{ marginTop: "8px" }}>
                            No Image Available
                        </Typography>
                    )}
                    {(imagePreview || rowData.image) && (
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleRemoveImage}
                            sx={{ mt: 1 }}
                        >
                            Remove Image
                        </Button>
                    )}
                </Box>
            </Box>
            <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography>Max Entrees:</Typography>
                <Button
                    className="plus"
                    variant="outlined"
                    sx={{
                        bgcolor: "green",
                        color: "white",
                        "&:hover": {
                            bgcolor: "darkgreen",
                        },
                    }}
                    onClick={() =>
                        onChange({
                            ...rowData,
                            maxentrees: (rowData.maxentrees || 0) + 1,
                        })
                    }
                >
                    +
                </Button>
                <Typography>{rowData.maxentrees ?? "None"}</Typography>
                <Button
                    className="minus"
                    variant="outlined"
                    sx={{
                        bgcolor: "red",
                        color: "white",
                        "&:hover": {
                            bgcolor: "darkred",
                        },
                    }}
                    onClick={() =>
                        onChange({
                            ...rowData,
                            maxentrees: Math.max(
                                0,
                                (rowData.maxentrees || 0) - 1
                            ),
                        })
                    }
                >
                    -
                </Button>
                <Button
                    variant="outlined"
                    onClick={() =>
                        onChange({
                            ...rowData,
                            maxentrees: null,
                        })
                    }
                >
                    None
                </Button>
            </Box>

            <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography>Max Sides:</Typography>
                <Button
                    className="plus"
                    variant="outlined"
                    sx={{
                        bgcolor: "green",
                        color: "white",
                        "&:hover": {
                            bgcolor: "darkgreen",
                        },
                    }}
                    onClick={() =>
                        onChange({
                            ...rowData,
                            maxsides: (rowData.maxsides || 0) + 1,
                        })
                    }
                >
                    +
                </Button>
                <Typography>{rowData.maxsides ?? "None"}</Typography>
                <Button
                    variant="outlined"
                    className="minus"
                    sx={{
                        bgcolor: "red",
                        color: "white",
                        "&:hover": {
                            bgcolor: "darkred",
                        },
                    }}
                    onClick={() =>
                        onChange({
                            ...rowData,
                            maxsides: Math.max(
                                0,
                                (rowData.maxsides || 0) - 1
                            ),
                        })
                    }
                >
                    -
                </Button>
                <Button
                    variant="outlined"
                    onClick={() =>
                        onChange({
                            ...rowData,
                            maxsides: null,
                        })
                    }
                >
                    None
                </Button>
            </Box>

            <Box mt={2} display="flex" alignItems="center">
                <Typography>Has Drink:</Typography>
                <Switch
                    checked={rowData.hasdrink}
                    onChange={(event) =>
                        onChange({
                            ...rowData,
                            hasdrink: event.target.checked,
                        })
                    }
                />
            </Box>
            <Box mt={2} display="flex" justifyContent="space-between">
                <Button className="plus" variant="contained" color="primary" onClick={onSave}>
                    Save
                </Button>
                <Button className="minus" variant="outlined" color="secondary" onClick={onCancel}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

MenuItemEditForm.propTypes = {
    rowData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        base_price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        description: PropTypes.string,
        maxentrees: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        maxsides: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        hasdrink: PropTypes.bool,
        image: PropTypes.string,
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    newImage: PropTypes.string,
    handleImageUpload: PropTypes.func.isRequired,
};

export default MenuItemEditForm;
