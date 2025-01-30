import { useEffect } from "react";
import { tokens } from "../../theme";
import { toast } from 'react-toastify';
import Form from "../../components/Form";
import Button from '@mui/material/Button';
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Box, useTheme } from "@mui/material";
import BasicModal from '../../components/Modal';
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, getItems } from "../../store/slices/item";
import { DeleteConfirmation } from "../../components/DeleteConfirmation";
import { 
  toggleLoading,
  saveEntryToBeUpdated, 
  toggleCreateOrUpdateModal, 
  toggleDeleteConfirmationModal 
} from "../../store/slices/common";
import {
  addButton,
  editButton,
  getItemColumns,
  itemFormColumns,
  initialValuesOfItem,
  checkoutSchemaOfItem,
} from '../../constants/FormFields';

const Item = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);

  const { items } = useSelector((state) => state.item);
  const { showCreateOrUpdateModal, entryToBeUpdateOrDelete } = useSelector((state) => state.common);

  const itemColumns = getItemColumns(
    '',
    (params) => `${params.row.pk}`,
    (params) => dispatch(saveEntryToBeUpdated(params.row)),
    (params) => dispatch(toggleDeleteConfirmationModal(params.row))
  );

  const deleteCB = async () => {
    await dispatch(toggleLoading());
    const result = await dispatch(deleteItem(entryToBeUpdateOrDelete.pk));
    if (result.payload.status === 200) toast.success("Item is deleted.");
    await dispatch(toggleLoading());
  }

  useEffect(() => {
    if (!items) dispatch(getItems())
    return () => dispatch(toggleCreateOrUpdateModal())
  }, [])

  return (
    <Box m="20px">
      <Box display="flex" alignItems="center" gap={10}>
        <Header title="Items" subtitle="" />
        <Button {...addButton} onClick={() => dispatch(toggleCreateOrUpdateModal({ action: 'create', value: true }))}>Add Item</Button>
      </Box>
      <Box
        m="8px 0 0 0"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={items}
          // unstable_rowSpanning
          columns={itemColumns}
          showCellVerticalBorder
          showColumnVerticalBorder
          disableRowSelectionOnClick
          getRowId={(row) => row?.pk}
        />
        {/* Crate or Update item modal */}
        <BasicModal
          handleClose={() => dispatch(toggleCreateOrUpdateModal())}
          open={showCreateOrUpdateModal.create || showCreateOrUpdateModal.update}
        >
          <Form
            subtitle=""
            source="item"
            inputsFields={itemFormColumns}
            checkoutSchema={checkoutSchemaOfItem}
            button={showCreateOrUpdateModal.create ? addButton : editButton}
            title={showCreateOrUpdateModal.create ? "Create Item" : "Update Item"}
            initialValues={showCreateOrUpdateModal.create ? initialValuesOfItem : entryToBeUpdateOrDelete}
          />
        </BasicModal>

        <DeleteConfirmation cb={deleteCB} />
      </Box>
    </Box>
  );
};

export default Item;
