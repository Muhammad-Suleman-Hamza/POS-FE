import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    entryToBeUpdateOrDelete: undefined,
    showDeleteConfirmationModal: false,
    showCreateOrUpdateModal: {
        create: false,
        update: false
    },
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    toggleLoading: (state) => {
        state.isLoading = !state.isLoading
    },
    toggleCreateOrUpdateModal: (state, { payload }) => {
        if (payload) state.showCreateOrUpdateModal[payload.action] = payload.value;
        else {
            state.showCreateOrUpdateModal['create'] = false;
            state.showCreateOrUpdateModal['update'] = false;
        }
    },
    saveEntryToBeUpdated: (state, { payload }) => {
        state.entryToBeUpdateOrDelete = payload;
        state.showCreateOrUpdateModal['update'] = true;
    },
    toggleDeleteConfirmationModal: (state, { payload }) => {
        state.entryToBeUpdateOrDelete = payload;
        state.showDeleteConfirmationModal = !state.showDeleteConfirmationModal;
    }
  },
})

export const { toggleLoading, saveEntryToBeUpdated, toggleCreateOrUpdateModal, toggleDeleteConfirmationModal } = commonSlice.actions;

export default commonSlice.reducer;