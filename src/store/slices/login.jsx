import axios from 'axios';
import { endpoints } from '../../constants/apiEndpoints';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    auth: undefined
}

export const login = createAsyncThunk(
    '/user/get',
    async (data) => {
      const user = axios.post(`${endpoints.user}/user/get`, data)
      .then(function (response) {
        console.log('then :: ', response);
      })
      .catch(function (error) {
        console.log('catch :: ', error);
      });
      return user
    }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { 
  },
  extraReducers: builder => {
    builder.addCase(login.pending, (state, action) => {
        state.status = 'pending'
        console.log('pending :: ', action);
    })
    builder.addCase(login.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        console.log('fulfilled :: ', action);
    })
    builder.addCase(login.rejected, (state, action) => {
        state.status = 'rejected'
        console.log('rejected :: ', action);
    })
  }
})

export const {  } = authSlice.actions

export default authSlice.reducer