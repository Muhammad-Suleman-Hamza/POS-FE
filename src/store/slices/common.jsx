import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    entryToBeUpdateOrDelete: undefined,
    showCreateOrUpdateModal: {
        create: false,
        update: false
    },
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    toggleCreateOrUpdateModal: (state, { payload }) => {
        if (payload) state.showCreateOrUpdateModal[payload.action] = payload.value
        else {
            state.showCreateOrUpdateModal['create'] = false
            state.showCreateOrUpdateModal['update'] = false
        }
    },
    saveEntryToBeUpdated: (state, { payload }) => {
        state.entryToBeUpdateOrDelete = payload
        state.showCreateOrUpdateModal['update'] = true
    },
  },
})

export const { toggleCreateOrUpdateModal, saveEntryToBeUpdated } = commonSlice.actions

export default commonSlice.reducer