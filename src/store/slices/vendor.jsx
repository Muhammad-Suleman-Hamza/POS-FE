import { createSlice } from '@reduxjs/toolkit'
import { mockVendors } from "../../data/mockData";

const initialState = {
    vendors: mockVendors,
}

export const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    vendorToBeDeleted: (state, { payload }) => {
      state.vendors = state.vendors.filter((item) => item.id !== payload.id);;
    },
  },
})

export const { vendorToBeDeleted } = vendorSlice.actions

export default vendorSlice.reducer