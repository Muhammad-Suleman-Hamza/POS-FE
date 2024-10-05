import { createSlice } from '@reduxjs/toolkit'
import { mockItems } from "../../data/mockData";

const initialState = {
    items: mockItems,
}

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    itemToBeDeleted: (state, { payload }) => {
      state.items = state.items.filter((item) => item.id !== payload.id);;
    },
  },
})

export const { itemToBeDeleted } = itemSlice.actions

export default itemSlice.reducer