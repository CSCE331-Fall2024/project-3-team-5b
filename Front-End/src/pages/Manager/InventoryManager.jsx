import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for React Router v6
import './InventoryManager.css'; // Import the CSS file

// Base URL configuration
const baseUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : import.meta.env.VITE_POS_API_BASE_URL;

/**
 * InventoryManager Component
 * Manages inventory items including viewing, adding, editing, and deleting items.
 * It fetches inventory data from an API and displays it in a table with sorting functionality.
 * 
 * @component
 * @returns {JSX.Element} The rendered InventoryManager component with inventory management functionalities.
 */
const InventoryManager = () => {
    const navigate = useNavigate(); // Initialize navigate hook
    const [inventory, setInventory] = useState([]);  // Inventory state
    const [loading, setLoading] = useState(true);  // Loading state for data fetch
    const [newItem, setNewItem] = useState({ name: '', quantity: '', unit: '', reorder_level: '' });  // State for new item form
    const [editingItem, setEditingItem] = useState(null);  // State for editing an item
    const [error, setError] = useState('');  // Error message state
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' }); // Sorting configuration state

    useEffect(() => {
        /**
         * Fetches the inventory data from the backend API and populates the inventory state.
         * Handles errors and loading states.
         */
        fetch(`${baseUrl}/api/inventory`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Inventory data:', data);
                setInventory(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching inventory:', error);
                setInventory([]);
                setLoading(false);
            });
    }, []);

    /**
     * Sorts inventory data based on a specified key and direction.
     * Toggles the sorting direction if the same column is clicked twice.
     * 
     * @param {string} key - The key to sort the inventory by (e.g., 'id', 'name').
     */
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ key, direction });

        const sortedInventory = [...inventory].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setInventory(sortedInventory);
    };

    /**
     * Validates the input values for a new or edited item.
     * Ensures all fields are filled out correctly and checks for duplicates.
     * 
     * @param {Object} item - The item to validate.
     * @param {boolean} [isEditing=false] - Whether the item is being edited or added.
     * @returns {string} - An error message if validation fails, or an empty string if validation passes.
     */
    const validateItem = (item, isEditing = false) => {
        if (!item.name || !item.quantity || !item.unit || !item.reorder_level) {
            return 'All fields are required';
        }
        if (isNaN(item.quantity) || item.quantity <= 0) {
            return 'Quantity must be a positive number';
        }
        if (isNaN(item.reorder_level) || item.reorder_level < 0) {
            return 'Reorder level must be a non-negative number';
        }
        // Check if the item name already exists (skip check if editing the same item)
        if (!isEditing && inventory.some(existingItem => existingItem.name.toLowerCase() === item.name.toLowerCase())) {
            return 'An item with this name already exists';
        }
        return '';
    };

    /**
     * Deletes an item from the inventory.
     * Sends a DELETE request to the backend API and removes the item from the inventory list.
     * 
     * @param {number} id - The ID of the item to delete.
     */
    const handleDelete = (id) => {
        fetch(`${baseUrl}/api/inventory/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                setInventory(inventory.filter(item => item.id !== id));
                alert('Item deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });
    };

    /**
     * Sets the item to be edited in the editing form.
     * 
     * @param {number} id - The ID of the item to edit.
     */
    const handleEdit = (id) => {
        const itemToEdit = inventory.find(item => item.id === id);
        setEditingItem(itemToEdit);
    };

    /**
     * Saves the changes made to an item after editing.
     * Sends a PUT request to the backend API to update the item.
     */
    const handleSaveEdit = () => {
        const validationError = validateItem(editingItem, true);
        if (validationError) {
            setError(validationError);
            return;
        }

        fetch(`${baseUrl}/api/inventory/${editingItem.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingItem),
        })
            .then(response => response.json())
            .then(updatedItem => {
                setInventory(inventory.map(item => (item.id === updatedItem.id ? updatedItem : item)));
                setEditingItem(null);
                setError('');
                alert('Item updated successfully');
            })
            .catch(error => {
                console.error('Error updating item:', error);
            });
    };

    /**
     * Adds a new item to the inventory.
     * Sends a POST request to the backend API to add the item.
     */
    const handleAddNew = () => {
        const validationError = validateItem(newItem);
        if (validationError) {
            setError(validationError);
            return;
        }

        fetch(`${baseUrl}/api/inventory`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem),
        })
            .then(response => response.json())
            .then(addedItem => {
                setInventory([...inventory, addedItem]);
                setNewItem({ name: '', quantity: '', unit: '', reorder_level: '' });
                setError('');
                alert('Item added successfully');
            })
            .catch(error => {
                console.error('Error adding item:', error);
            });
    };

    /**
     * Handles input change for the new item or edited item forms.
     * Updates the respective state based on which form is being filled.
     * 
     * @param {Event} e - The input change event.
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingItem) {
            setEditingItem({ ...editingItem, [name]: value });
        } else {
            setNewItem({ ...newItem, [name]: value });
        }
    };

    /**
     * Navigates back to the "manage-stuff" page.
     */
    const handleBackClick = () => {
        navigate('/manage-stuff');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
    <div className="inventory-manager">

        <button className="inventory-manager__back-button" onClick={handleBackClick}>Back</button>

        <div className="inventory-manager__add-item-section">
            <h2>Add New Item</h2>
            <form>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newItem.name}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={newItem.quantity}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="unit"
                    placeholder="Unit"
                    value={newItem.unit}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="reorder_level"
                    placeholder="Reorder Level"
                    value={newItem.reorder_level}
                    onChange={handleInputChange}
                />
                <button type="button" onClick={handleAddNew}>Add Item</button>
            </form>
        </div>

        <table className="inventory-manager__table">
            <thead>
                <tr>
                    <th onClick={() => handleSort('id')}>ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                    <th onClick={() => handleSort('name')}>Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                    <th onClick={() => handleSort('quantity')}>Quantity {sortConfig.key === 'quantity' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                    <th onClick={() => handleSort('unit')}>Unit {sortConfig.key === 'unit' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                    <th onClick={() => handleSort('reorder_level')}>Reorder Level {sortConfig.key === 'reorder_level' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {inventory.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.unit}</td>
                        <td>{item.reorder_level}</td>
                        <td>
                            <button onClick={() => handleEdit(item.id)}>Edit</button>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        {editingItem && (
            <div className="inventory-manager__edit-item-form">
                <h2>Edit Item</h2>
                <form>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={editingItem.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={editingItem.quantity}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="unit"
                        placeholder="Unit"
                        value={editingItem.unit}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="reorder_level"
                        placeholder="Reorder Level"
                        value={editingItem.reorder_level}
                        onChange={handleInputChange}
                    />
                    <button type="button" onClick={handleSaveEdit}>Save Changes</button>
                </form>
            </div>
        )}
    </div>

    );
};

export default InventoryManager;
