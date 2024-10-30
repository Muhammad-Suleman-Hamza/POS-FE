import axios from 'axios';
import { endpoints } from '../../constants/apiEndpoints';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getLocalStorage, setLocalStorage } from '../../helpers/storage';

const initialState = {
  orders: getLocalStorage('orders') || [],
}

export const getOrder = createAsyncThunk(
  '/order/get',
  async (pk) => {
    const user = axios.post(`${endpoints.order}/order/get`, pk);
    return user;
  }
)

export const getOrders = createAsyncThunk(
  '/order/all',
  async () => {
    const user = axios.get(`${endpoints.order}/order/all`);
    return user;
  }
)

export const addOrder = createAsyncThunk(
  '/order/add',
  async (order) => {
    const user = axios.post(`${endpoints.order}/order/add`, order);
    return user;
  }
)

export const updateOrder = createAsyncThunk(
  '/order/update',
  async (order) => {
    const user = axios.post(`${endpoints.order}/order/update`, order);
    return user;
  }
)

export const deleteOrder = createAsyncThunk(
  '/order/delete',
  async (pk) => {
    const user = axios.post(`${endpoints.order}/order/delete`, { pk });
    return user;
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderToBeDeleted: (state, { payload }) => {
      state.orders = state.orders.filter((item) => item.id !== payload.id);;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getOrder.fulfilled, (state, { payload: { data } }) => {
        state.orders = state.orders;
      })
      .addCase(getOrders.fulfilled, (state, { payload: { data } }) => {
        state.orders = data;
        setLocalStorage('orders', data);
      })
      .addCase(addOrder.fulfilled, (state, { payload: { data } }) => {
        const updated = [...state?.orders, data];

        state.orders = updated;
        setLocalStorage('orders', updated);
      })
      .addCase(updateOrder.fulfilled, (state, { payload: { data } }) => {
        const order = {
          ...data,
          ...JSON.parse(data.customer),
          ...JSON.parse(data.orderItem),
          ...JSON.parse(data.paymentMethod)
        }
        const index = state.orders.findIndex(item => item.pk == order.pk);

        state.orders[index] = order;
        setLocalStorage('orders', state.orders);
      })
      .addCase(deleteOrder.fulfilled, (state, { payload: { data } }) => {
        const updated = state?.orders.filter((item) => item?.pk !== data[0]?.pk);
        state.orders = updated;
        setLocalStorage('orders', updated);
      })
  }
})

export const { orderToBeDeleted } = orderSlice.actions

export default orderSlice.reducer

