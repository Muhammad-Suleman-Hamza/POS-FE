import { createSlice } from '@reduxjs/toolkit'
import { mockOrders } from "../../data/mockData";

const initialState = {
    orders: mockOrders,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderToBeDeleted: (state, { payload }) => {
      state.orders = state.orders.filter((item) => item.id !== payload.id);;
    },
  },
})

export const { orderToBeDeleted } = orderSlice.actions

export default orderSlice.reducer