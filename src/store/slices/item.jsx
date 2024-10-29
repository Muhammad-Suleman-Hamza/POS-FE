import axios from 'axios';
import { endpoints } from '../../constants/apiEndpoints';
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { getLocalStorage, setLocalStorage } from '../../helpers/storage';

const initialState = {
  items: getLocalStorage('items') || [],
}

export const getItem = createAsyncThunk(
  '/item/get',
  async (pk) => {
    const user = axios.post(`${endpoints.item}/item/get`, pk);
    return user;
  }
)

export const getItems = createAsyncThunk(
  '/item/all',
  async () => {
    const user = axios.get(`${endpoints.item}/item/all`);
    return user;
  }
)

export const addItem = createAsyncThunk(
  '/item/add',
  async (item) => {
    const user = axios.post(`${endpoints.item}/item/add`, item);
    return user;
  }
)

export const updateItem = createAsyncThunk(
  '/item/update',
  async (item) => {
    const user = axios.post(`${endpoints.item}/item/update`, item);
    return user;
  }
)

export const deleteItem = createAsyncThunk(
  '/item/delete',
  async (pk) => {
    const user = axios.post(`${endpoints.item}/item/delete`, { pk });
    return user;
  }
)

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(getItem.fulfilled, (state, { payload: { data } }) => {
        state.items = state.items;
      })
      .addCase(getItems.fulfilled, (state, { payload: { data } }) => {
        state.items = data;
        setLocalStorage('items', data);
      })
      .addCase(addItem.fulfilled, (state, { payload: { data } }) => {
        const updated = [...state?.items, data];
        state.items = updated;
        setLocalStorage('items', updated);
      })
      .addCase(updateItem.fulfilled, (state, { payload: { data } }) => {
        const index = state.items.findIndex(item => item.pk == data.pk);
        state.items[index] = data;
        setLocalStorage('items', state.items);
      })
      .addCase(deleteItem.fulfilled, (state, { payload: { data } }) => {
        const updated = state?.items.filter((item) => item?.pk !== data[0]?.pk);
        state.items = updated;
        setLocalStorage('items', updated);
      })
  }
})

export const { } = itemSlice.actions

export default itemSlice.reducer