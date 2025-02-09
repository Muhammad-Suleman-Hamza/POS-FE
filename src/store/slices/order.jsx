import interceptor from '../../helpers/interceptor';
import { endpoints } from '../../constants/apiEndpoints';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getLocalStorage, setLocalStorage } from '../../helpers/storage';

const initialState = {
  orders: getLocalStorage('orders'),
}

export const getOrder = createAsyncThunk(
  '/order/get',
  async (pk) => {
    const o = interceptor.post(`${endpoints.order}/order/get`, pk);
    return o;
  }
)

export const getOrders = createAsyncThunk(
  '/order/all',
  async () => {
    const o = interceptor.get(`${endpoints.order}/order/all`);
    return o;
  }
)

export const addOrder = createAsyncThunk(
  '/order/add',
  async (order) => {
    const o = interceptor.post(`${endpoints.order}/order/add`, order);
    return o;
  }
)

export const updateOrder = createAsyncThunk(
  '/order/update',
  async (order) => {
    const o = interceptor.post(`${endpoints.order}/order/update`, order);
    return o;
  }
)

export const deleteOrder = createAsyncThunk(
  '/order/delete',
  async (pk) => {
    const o = interceptor.post(`${endpoints.order}/order/delete`, { pk });
    return o;
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = undefined
    }
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
        const updated = [data, ...state?.orders];

        state.orders = updated;
        setLocalStorage('orders', updated);
      })
      .addCase(updateOrder.fulfilled, (state, { payload: { data } }) => {
        const index = state.orders.findIndex(item => item.pk == data.pk);

        state.orders[index] = data;
        setLocalStorage('orders', state.orders);
      })
      .addCase(deleteOrder.fulfilled, (state, { payload: { data } }) => {
        const updated = state?.orders.filter((item) => item?.pk !== data[0]?.pk);
        state.orders = updated;
        setLocalStorage('orders', updated);
      })
  }
})

export const { clearOrders } = orderSlice.actions

export default orderSlice.reducer

