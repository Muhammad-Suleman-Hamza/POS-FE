import axios from 'axios';
import { endpoints } from '../../constants/apiEndpoints';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setSessionStorage } from '../../helpers/storage';

const initialState = {
    user: undefined
}

export const login = createAsyncThunk(
    '/user/get',
    async (data) => {
      const user = axios.post(`${endpoints.user}/user/get`, data)
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
      setSessionStorage('sessionToken', data.sessionToken)
    })
  }
})

export const {  } = authSlice.actions

export default authSlice.reducer