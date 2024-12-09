import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeCSS.css';

/**
 * Employee Management Component
 * Handles the display and management of employee data, including adding, editing, and deleting employees.
 * 
 * @component
 * @returns {JSX.Element} The rendered Employee Management page with a table of employees and a form for adding or editing employees.
 */
function Employee() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: '', hours_worked: '', password: '', manager_id: '' });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function
  const baseUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : import.meta.env.VITE_POS_API_BASE_URL;  // Determine the base URL based on the environment

  /**
   * Fetches the list of employees from the API.
   */
  useEffect(() => {
    fetchEmployees();
  }, []);

  /**
   * Fetches employee data from the API and updates the employees state.
   */
  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/employees`);
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  /**
   * Handles adding or editing an employee.
   * If `editId` is set, the employee is updated; otherwise, a new employee is added.
   * 
   * @param {Event} e - The form submission event
   */
  const handleAddOrEditEmployee = async (e) => {
    e.preventDefault();
    try {
      const url = editId
        ? `${baseUrl}/api/employees/${editId}`
        : `${baseUrl}/api/employees`;

      const method = editId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editId ? 'edit' : 'add'} employee`);
      }

      // Refresh employees and clear the form
      fetchEmployees();
      setFormData({ name: '', hours_worked: '', password: '', manager_id: '' });
      setEditId(null);
    } catch (error) {
      console.error(`Error ${editId ? 'editing' : 'adding'} employee:`, error);
    }
  };

  /**
   * Handles deleting an employee.
   * 
   * @param {number} id - The ID of the employee to delete
   */
  const handleDeleteEmployee = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/api/employees/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }

      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  /**
   * Handles editing an employee's details.
   * 
   * @param {Object} employee - The employee object to edit
   */
  const handleEditClick = (employee) => {
    setEditId(employee.id);
    setFormData({
      name: employee.name,
      hours_worked: employee.hours_worked,
      password: employee.password,
      manager_id: employee.manager_id,
    });
  };

  return (
    <div className="employee">
      <h1>Employee Management</h1>

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>

      {/* Employee Table */}
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Hours Worked</th>
            <th>Password</th>
            <th>Manager ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.hours_worked}</td>
              <td>{employee.password}</td>
              <td>{employee.manager_id}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditClick(employee)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDeleteEmployee(employee.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Employee Form */}
      <h2>{editId ? 'Edit Employee' : 'Add Employee'}</h2>
      <form className="employee-form" onSubmit={handleAddOrEditEmployee}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Hours Worked:
            <input
              type="number"
              step="0.01"
              value={formData.hours_worked}
              onChange={(e) => setFormData({ ...formData, hours_worked: e.target.value })}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Manager ID:
            <input
              type="number"
              value={formData.manager_id}
              onChange={(e) => setFormData({ ...formData, manager_id: e.target.value })}
              required
            />
          </label>
        </div>
        <button type="submit" className="submit-btn">
          {editId ? 'Save Changes' : 'Add Employee'}
        </button>
      </form>
    </div>
  );
}

export default Employee;

