import interceptor from '../../helpers/interceptor';
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
      const response = await interceptor.post(`${endpoints.user}/user/get`, data);
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
    const user = interceptor.post(`${endpoints.user}/user/update`, data)
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
      const currentsessionToken = getSessionStorage('sessionToken');
      data.message.SessionToken = currentsessionToken;
      state.user = data.message;
      setSessionStorage('user', data.message)
    })
  }
})

export const { clearUser } = authSlice.actions

export default authSlice.reducer