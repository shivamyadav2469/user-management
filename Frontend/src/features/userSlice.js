import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:5000/api/users');
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await axios.delete(`http://localhost:5000/api/users/${id}`);
  return id; 
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, userData }) => {
  const response = await axios.put(`http://localhost:5000/api/users/${id}`, userData);
  return response.data; 
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload; 
        state.status = 'success'; 
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'; 
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed'; 
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload); 
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload; 
        }
      });
  },
});

export default userSlice.reducer;
