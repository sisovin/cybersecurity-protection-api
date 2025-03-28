import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [newRole, setNewRole] = useState({ name: '' });
  const [newPermission, setNewPermission] = useState({ name: '', role: '' });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('/api/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await axios.get('/api/permissions');
      setPermissions(response.data);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post('/api/users', newUser);
      fetchUsers();
      setNewUser({ username: '', password: '' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleAddRole = async () => {
    try {
      await axios.post('/api/roles', newRole);
      fetchRoles();
      setNewRole({ name: '' });
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };

  const handleAddPermission = async () => {
    try {
      await axios.post('/api/permissions', newPermission);
      fetchPermissions();
      setNewPermission({ name: '', role: '' });
    } catch (error) {
      console.error('Error adding permission:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            className="border p-2 mr-2"
          />
          <button onClick={handleAddUser} className="bg-blue-500 text-white p-2">
            Add User
          </button>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Roles</h2>
        <ul>
          {roles.map((role) => (
            <li key={role.id}>{role.name}</li>
          ))}
        </ul>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Role Name"
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            className="border p-2 mr-2"
          />
          <button onClick={handleAddRole} className="bg-blue-500 text-white p-2">
            Add Role
          </button>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Permissions</h2>
        <ul>
          {permissions.map((permission) => (
            <li key={permission.id}>{permission.name} (Role: {permission.role})</li>
          ))}
        </ul>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Permission Name"
            value={newPermission.name}
            onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Role"
            value={newPermission.role}
            onChange={(e) => setNewPermission({ ...newPermission, role: e.target.value })}
            className="border p-2 mr-2"
          />
          <button onClick={handleAddPermission} className="bg-blue-500 text-white p-2">
            Add Permission
          </button>
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
