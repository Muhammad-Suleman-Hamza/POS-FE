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
import { toggleCreateOrUpdateModal, saveEntryToBeUpdated } from "../../store/slices/common";
import {
  addButton,
  customerFormColumns,
  initialValuesOfCustomer,
  checkoutSchemaOfCustomer
} from '../../constants/FormFields'
import { customerToBeDeleted } from "../../store/slices/customer";

const Customer = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);

  const { customers } = useSelector((state) => state.customer);
  const { showCreateOrUpdateModal, entryToBeUpdateOrDelete } = useSelector((state) => state.common);
  
  const customerColumns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'number', headerName: 'Number', width: 200 },
    { field: 'operations', headerName: 'Operations', width: 200, renderCell: (params) => (
        <Box>
            <Button {...editButton} onClick={()=> dispatch(saveEntryToBeUpdated(params.row))}>Edit</Button>
            <Button {...editButton} onClick={()=> dispatch(customerToBeDeleted(params.row))}>Delete</Button>
        </Box>
    )},
  ];

  useEffect(() => {
    return () => dispatch(toggleCreateOrUpdateModal())
  }, [])

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Customers" subtitle="" />
        <Button {...addButton} onClick={() => dispatch(toggleCreateOrUpdateModal({ action: 'create', value: true }))}>Add Customer</Button>
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
        <DataGrid rows={customers} columns={customerColumns} />

        <BasicModal 
          handleClose={() => dispatch(toggleCreateOrUpdateModal())}
          open={showCreateOrUpdateModal.create || showCreateOrUpdateModal.update} 
        >
          <Form 
            subtitle=""
            inputsFields={customerFormColumns}
            checkoutSchema={checkoutSchemaOfCustomer}
            title={showCreateOrUpdateModal.create ? "Create Customer" : "Update Customer"}
            button={showCreateOrUpdateModal.create ? addButton: editButton}
            initialValues={showCreateOrUpdateModal.create ? initialValuesOfCustomer : entryToBeUpdateOrDelete}
          />
        </BasicModal>
      </Box>
    </Box>
  );
};

export default Customer;
