import { createSlice } from '@reduxjs/toolkit'
import { mockCustomers } from "../../data/mockData";

const initialState = {
    customers: mockCustomers,
}

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    customerToBeDeleted: (state, { payload }) => {
      state.customers = state.customers.filter((item) => item.id !== payload.id);;
    },
  },
})

export const { customerToBeDeleted } = customerSlice.actions

export default customerSlice.reducer