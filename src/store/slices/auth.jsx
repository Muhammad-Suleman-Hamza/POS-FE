import axios from 'axios';
import { endpoints } from '../../constants/apiEndpoints';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSessionStorage, setSessionStorage } from '../../helpers/storage';

const initialState = {
  user: getSessionStorage('user')
}

export const login = createAsyncThunk(
  '/user/get',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${endpoints.user}/user/get`, data);
      return response;
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        return rejectWithValue({ message: data.message, status });
      } else {
        return rejectWithValue({ message: "Network error", status: 500 });
      }
    }
  }
)

export const updateUser = createAsyncThunk(
  '/user/update',
  async (data) => {
    const user = axios.post(`${endpoints.user}/user/update`, data)
    return user;
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = undefined
    }
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, { payload: { data: { message } } }) => {
      state.user = message;
      setSessionStorage('user', message)
      setSessionStorage('sessionToken', message.sessionToken)
    })
    builder.addCase(updateUser.fulfilled, (state, { payload: { data } }) => {
      state.user = data;
      setSessionStorage('user', data)
    })
  }
})

export const { clearUser } = authSlice.actions

export default authSlice.reducer