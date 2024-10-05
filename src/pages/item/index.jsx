import { useEffect } from "react";
import { tokens } from "../../theme";
import Form from "../../components/Form";
import Button from '@mui/material/Button';
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Box, useTheme } from "@mui/material";
import BasicModal from '../../components/Modal';
import { useDispatch,useSelector } from "react-redux";
import { editButton } from '../../constants/FormFields';
import { itemToBeDeleted } from "../../store/slices/item";
import { toggleCreateOrUpdateModal, saveEntryToBeUpdated } from "../../store/slices/common";
import {
  addButton,
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
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'price', headerName: 'Price', width: 200 },
    { field: 'weight', headerName: 'Weight', width: 200 },
    { field: 'dimensions', headerName: 'Dimensions', width: 200 },
    { field: 'measuringUnit', headerName: 'Measuring Unit', width: 200 },
    { field: 'operations', headerName: 'Operations', width: 200, renderCell: (params) => (
        <Box>
            <Button {...editButton} onClick={()=> dispatch(saveEntryToBeUpdated(params.row))}>Edit</Button>
            <Button {...editButton} onClick={()=> dispatch(itemToBeDeleted(params.row))}>Delete</Button>
        </Box>
    )},
  ];

  useEffect(() => {
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
        <DataGrid rows={items} columns={itemColumns} />

        {/* Crate or Update item modal */}
        <BasicModal 
          handleClose={() => dispatch(toggleCreateOrUpdateModal())}
          open={showCreateOrUpdateModal.create || showCreateOrUpdateModal.update} 
        >
          <Form 
            subtitle=""
            inputsFields={itemFormColumns}
            checkoutSchema={checkoutSchemaOfItem}
            title={showCreateOrUpdateModal.create ? "Create Item" : "Update Item"}
            button={showCreateOrUpdateModal.create ? addButton: editButton}
            initialValues={showCreateOrUpdateModal.create ? initialValuesOfItem : entryToBeUpdateOrDelete}
          />
        </BasicModal>
      </Box>
    </Box>
  );
};

export default Item;
