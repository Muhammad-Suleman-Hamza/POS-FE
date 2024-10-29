import axios from 'axios';
import { endpoints } from '../../constants/apiEndpoints';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getLocalStorage, setLocalStorage } from '../../helpers/storage';

const initialState = {
  customers: getLocalStorage('customers') || [],
}

export const getCustomer = createAsyncThunk(
  '/customer/get',
  async (pk) => {
    const user = axios.post(`${endpoints.customer}/customer/get`, pk);
    return user;
  }
)

export const getCustomers = createAsyncThunk(
  '/customer/all',
  async () => {
    const user = axios.get(`${endpoints.customer}/customer/all`);
    return user;
  }
)

export const addCustomer = createAsyncThunk(
  '/customer/add',
  async (customer) => {
    const user = axios.post(`${endpoints.customer}/customer/add`, customer);
    return user;
  }
)

export const updateCustomer = createAsyncThunk(
  '/customer/update',
  async (customer) => {
    const user = axios.post(`${endpoints.customer}/customer/update`, customer);
    return user;
  }
)

export const deleteCustomer = createAsyncThunk(
  '/customer/delete',
  async (pk) => {
    const user = axios.post(`${endpoints.customer}/customer/delete`, { pk });
    return user;
  }
)

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(getCustomer.fulfilled, (state, { payload: { data } }) => {
        state.customers = state.customers;
      })
      .addCase(getCustomers.fulfilled, (state, { payload: { data } }) => {
        state.customers = data;
        setLocalStorage('customers', data);
      })
      .addCase(addCustomer.fulfilled, (state, { payload: { data } }) => {
        const updated = [...state?.customers, data];
        state.customers = updated;
        setLocalStorage('customers', updated);
      })
      .addCase(updateCustomer.fulfilled, (state, { payload: { data } }) => {
        const index = state.customers.findIndex((customer) => customer.pk == data.pk);
        state.customers[index] = data;
        setLocalStorage('customers', state.customers);
      })
      .addCase(deleteCustomer.fulfilled, (state, { payload: { data } }) => {
        const updated = state?.customers.filter((customer) => customer?.pk !== data[0]?.pk);
        state.customers = updated;
        setLocalStorage('customers', updated);
      })
  }
})

export const { customerToBeDeleted } = customerSlice.actions

export default customerSlice.reducer