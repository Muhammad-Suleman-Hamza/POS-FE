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
import { DeleteConfirmation } from "../../components/deleteComfirmation";
import { getCustomers, deleteCustomer } from "../../store/slices/customer";
import { editButton, getCustomerColumns } from '../../constants/FormFields';
import {
  saveEntryToBeUpdated,
  toggleCreateOrUpdateModal,
  toggleDeleteConfirmationModal
} from "../../store/slices/common";
import {
  addButton,
  customerFormColumns,
  initialValuesOfCustomer,
  checkoutSchemaOfCustomer
} from '../../constants/FormFields'

const Customer = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);

  const { customers } = useSelector((state) => state.customer);
  const { showCreateOrUpdateModal, entryToBeUpdateOrDelete } = useSelector((state) => state.common);

  const customerColumns = getCustomerColumns(
    '',
    (params) => `${params.row.pk}`,
    (params) => dispatch(saveEntryToBeUpdated(params.row)),
    (params) => dispatch(toggleDeleteConfirmationModal(params.row))
  );


  const deleteCB = async () => {
    await dispatch(toggleLoading()); 
    const result = await dispatch(deleteCustomer(entryToBeUpdateOrDelete.pk));
    if (result.payload.status === 200) toast.success("Customer is deleted.");
    await dispatch(toggleLoading());
  }

  useEffect(() => {
    if (!customers) dispatch(getCustomers())
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
        <DataGrid
          rows={customers}
          unstable_rowSpanning
          showCellVerticalBorder
          showColumnVerticalBorder
          columns={customerColumns}
          disableRowSelectionOnClick
          getRowId={(row) => row?.pk}
        />

        <BasicModal
          handleClose={() => dispatch(toggleCreateOrUpdateModal())}
          open={showCreateOrUpdateModal.create || showCreateOrUpdateModal.update}
        >
          <Form
            subtitle=""
            source="customer"
            inputsFields={customerFormColumns}
            checkoutSchema={checkoutSchemaOfCustomer}
            button={showCreateOrUpdateModal.create ? addButton : editButton}
            title={showCreateOrUpdateModal.create ? "Create Customer" : "Update Customer"}
            initialValues={showCreateOrUpdateModal.create ? initialValuesOfCustomer : entryToBeUpdateOrDelete}
          />
        </BasicModal>

        <DeleteConfirmation cb={deleteCB} />
      </Box>
    </Box>
  );
};

export default Customer;
