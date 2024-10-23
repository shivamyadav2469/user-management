import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../features/userSlice';
import EditUserModal from './EditUserModal';

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-green-900 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">User Management</h1>
        <div>
          <a href="/login" className="text-white mr-4">Login</a>
          <a href="/register" className="text-white">Register</a>
        </div>
      </div>
    </nav>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} User Management. All rights reserved.</p>
      </div>
    </footer>
  );
};

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, status } = useSelector((state) => state.user);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'success' && users.length === 0) {
      navigate('/login');
    }
  }, [status, users.length, navigate]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col items-center bg-gray-300 p-4">
        <h1 className="text-3xl font-bold mb-6">Users List</h1>
        {status === 'success' && users.length > 0 ? (
          <div className="overflow-x-auto w-full max-w-4xl shadow-lg rounded-lg border border-gray-200">
            <div className="bg-white rounded-lg p-4">
              <table className="min-w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 px-4 border-b">#</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition duration-200 text-center">
                      <td className="py-2 px-4 border-b">{index + 1}</td>
                      <td className="py-2 px-4 border-b">{user.username}</td>
                      <td className="py-2 px-4 border-b">{user.email}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => openEditModal(user)}
                          className="px-3 py-1 text-white bg-green-800 rounded-md hover:bg-green-900 focus:outline-none focus:ring-2 focus:bg-green-600 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="px-3 py-1 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-lg text-gray-600">No users found.</p>
            <p className="text-sm text-gray-500">Redirecting to the login page...</p>
          </div>
        )}
        {isEditModalOpen && (
          <EditUserModal user={selectedUser} onClose={closeEditModal} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
