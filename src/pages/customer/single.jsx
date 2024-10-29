import { useEffect, useState } from "react";
import { tokens } from "../../theme";
import { toast } from 'react-toastify';
import Form from "../../components/Form";
import Button from '@mui/material/Button';
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { Box, useTheme } from "@mui/material";
import BasicModal from '../../components/Modal';
import { useDispatch, useSelector } from "react-redux";
import { editButton, getCustomerColumns } from '../../constants/FormFields';
import { getCustomers, deleteCustomer } from "../../store/slices/customer";
import { toggleCreateOrUpdateModal, saveEntryToBeUpdated } from "../../store/slices/common";
import {
  addButton,
  customerFormColumns,
  initialValuesOfCustomer,
  checkoutSchemaOfCustomer
} from '../../constants/FormFields'

const SingleCustomer = () => {
  const theme = useTheme();
  const { id } = useParams();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);

  const [customer, setCustomer] = useState([]);

  const { customers } = useSelector((state) => state.customer);
  const { showCreateOrUpdateModal, entryToBeUpdateOrDelete } = useSelector((state) => state.common);

  const customerColumns = getCustomerColumns(
    'single',
    (params) => `${params.row.pk}`,
    (params) => dispatch(saveEntryToBeUpdated(params.row)),
    async (params) => {
      const result = await dispatch(deleteCustomer(params.row.pk));
      if (result.payload.status === 200) toast.warning("Customer is deleted.")
    }
  );

  useEffect(() => {
    if (id && !customer.length) setCustomer(customers.filter((customer) => customer.pk === id));
    return () => dispatch(toggleCreateOrUpdateModal())
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={`Customers: ${id}`} subtitle="" />
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
          rows={customer}
          unstable_rowSpanning
          showCellVerticalBorder
          showColumnVerticalBorder
          columns={customerColumns}
          disableRowSelectionOnClick
          getRowId={(row) => row.pk}
        />

        <BasicModal
          handleClose={() => dispatch(toggleCreateOrUpdateModal())}
          open={showCreateOrUpdateModal.create || showCreateOrUpdateModal.update}
        >
          <Form
            subtitle=""
            source='customer'
            inputsFields={customerFormColumns}
            checkoutSchema={checkoutSchemaOfCustomer}
            button={showCreateOrUpdateModal.create ? addButton : editButton}
            title={showCreateOrUpdateModal.create ? "Create Customer" : "Update Customer"}
            initialValues={showCreateOrUpdateModal.create ? initialValuesOfCustomer : entryToBeUpdateOrDelete}
          />
        </BasicModal>
      </Box>
    </Box>
  );
};

export default SingleCustomer;
