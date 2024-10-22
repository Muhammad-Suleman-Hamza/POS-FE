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
import { toggleCreateOrUpdateModal, saveEntryToBeUpdated } from "../../store/slices/common";
import {
  addButton,
  editButton,
  itemFormColumns,
  initialValuesOfItem,
  checkoutSchemaOfItem
} from '../../constants/FormFields'

const Item = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);

  const { items } = useSelector((state) => state.item);
  const { showCreateOrUpdateModal, entryToBeUpdateOrDelete } = useSelector((state) => state.common);

  const itemColumns = [
    { field: 'itemName', headerName: 'Name', width: 200 },
    { field: 'price', headerName: 'Price', width: 200 },
    { field: 'weight', headerName: 'Weight', width: 200 },
    { field: 'dimensions', headerName: 'Dimensions', width: 200 },
    { field: 'measuringUnit', headerName: 'Measuring Unit', width: 200 },
    {
      field: 'operations', headerName: 'Operations', width: 200, renderCell: (params) => (
        <Box>
          <Button {...editButton} onClick={() => dispatch(saveEntryToBeUpdated(params.row))}>Edit</Button>
          <Button {...editButton} onClick={async () => {
            const result = await dispatch(deleteItem(params.row.pk))
            if (result.payload.status === 200) toast.warning("Item is deleted.")
          }}>Delete</Button>
        </Box>
      )
    },
  ];

  useEffect(() => {
    if (items?.length === 0) dispatch(getItems())
    return () => dispatch(toggleCreateOrUpdateModal())
  }, [])

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
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
        <DataGrid rows={items} columns={itemColumns} getRowId={(row) => row.pk} />
        {/* Crate or Update item modal */}
        <BasicModal
          handleClose={() => dispatch(toggleCreateOrUpdateModal())}
          open={showCreateOrUpdateModal.create || showCreateOrUpdateModal.update}
        >
          <Form
            subtitle=""
            source='item'
            inputsFields={itemFormColumns}
            checkoutSchema={checkoutSchemaOfItem}
            button={showCreateOrUpdateModal.create ? addButton : editButton}
            title={showCreateOrUpdateModal.create ? "Create Item" : "Update Item"}
            initialValues={showCreateOrUpdateModal.create ? initialValuesOfItem : entryToBeUpdateOrDelete}
          />
        </BasicModal>
      </Box>
    </Box>
  );
};

export default Item;
