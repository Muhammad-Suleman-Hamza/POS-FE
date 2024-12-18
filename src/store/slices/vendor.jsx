import axios from 'axios';
import { endpoints } from '../../constants/apiEndpoints';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getLocalStorage, setLocalStorage } from '../../helpers/storage';

const initialState = {
  vendors: getLocalStorage('vendors'),
}

export const getVendor = createAsyncThunk(
  '/vendor/get',
  async (pk) => {
    const response = axios.post(`${endpoints.vendor}/vendor/get`, pk);
    return response;
  }
)

export const getVendors = createAsyncThunk(
  '/vendor/all',
  async () => {
    const response = axios.get(`${endpoints.vendor}/vendor/all`);
    return response;
  }
)

export const addVendor = createAsyncThunk(
  '/vendor/add',
  async (vendor) => {
    const response = axios.post(`${endpoints.vendor}/vendor/add`, vendor);
    return response;
  }
)

export const updateVendor = createAsyncThunk(
  '/vendor/update',
  async (vendor) => {
    const response = axios.post(`${endpoints.vendor}/vendor/update`, vendor);
    return response;
  }
)

export const deleteVendor = createAsyncThunk(
  '/vendor/delete',
  async (pk) => {
    const response = axios.post(`${endpoints.vendor}/vendor/delete`, { pk });
    return response;
  }
)
export const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    clearVendors: (state) => {
      state.vendors = undefined
    }
  },
  extraReducers: builder => {
    builder
    .addCase(getVendor.fulfilled, (state, { payload: { data } }) => {
      state.vendors = state.vendors;
    })
    .addCase(getVendors.fulfilled, (state, { payload: { data } }) => {
      state.vendors = data;
      setLocalStorage('vendors', data);
    })
    .addCase(addVendor.fulfilled, (state, { payload: { data } }) => {
      const updated = [...state?.vendors, data];
      state.vendors = updated;
      setLocalStorage('vendors', updated);
    })
    .addCase(updateVendor.fulfilled, (state, { payload: { data } }) => {
      const index = state.vendors.findIndex((vendor) => vendor.pk == data.pk);
      state.vendors[index] = data;
      setLocalStorage('vendors', state.vendors);
    })
    .addCase(deleteVendor.fulfilled, (state, { payload: { data } }) => {
      const updated = state?.vendors.filter((vendor) => vendor?.pk !== data[0]?.pk);
      state.vendors = updated;
      setLocalStorage('vendors', updated);
    })
  }
})

export const { clearVendors } = vendorSlice.actions

export default vendorSlice.reducer