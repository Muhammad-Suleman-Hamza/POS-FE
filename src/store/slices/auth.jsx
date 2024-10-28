import axios from 'axios';
import { endpoints } from '../../constants/apiEndpoints';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSessionStorage, setSessionStorage } from '../../helpers/storage';

const initialState = {
    user: getSessionStorage('user') || undefined
}

export const login = createAsyncThunk(
    '/user/get',
    async (data) => {
      const user = axios.post(`${endpoints.user}/user/get`, data)
      return user
    }
)

export const updateUser = createAsyncThunk(
  '/user/update',
  async (data) => {
    const user = axios.post(`${endpoints.user}/user/update`, data)
    return user
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { 
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, { payload : { data } }) => {
      state.user = data;
      setSessionStorage('user', data)
    })
    builder.addCase(updateUser.fulfilled, (state, { payload : { data } }) => {
      state.user = data;
      setSessionStorage('user', data)
    })
  }
})

export const {  } = authSlice.actions

export default authSlice.reducer