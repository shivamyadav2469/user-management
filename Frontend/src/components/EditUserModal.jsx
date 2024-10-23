import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../features/userSlice';

const EditUserModal = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const handleEdit = (e) => {
    e.preventDefault();
    const userData = { username, email };
    dispatch(updateUser({ id: user._id, userData })); 
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleEdit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
