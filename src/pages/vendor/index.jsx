import { useEffect } from "react";
import { tokens } from "../../theme";
import { toast } from 'react-toastify';
import Form from "../../components/Form";
import Button from '@mui/material/Button';
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Box, useTheme } from "@mui/material";
import BasicModal from '../../components/Modal';
import { useDispatch,useSelector } from "react-redux";
import { editButton } from '../../constants/FormFields';
import { deleteVendor, getVendors } from "../../store/slices/vendor";
import { toggleCreateOrUpdateModal, saveEntryToBeUpdated } from "../../store/slices/common";
import {
  addButton,
  vendorFormColumns,
  initialValuesOfVendor,
  checkoutSchemaOfVendor
} from '../../constants/FormFields'

const Vendor = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);

  const { vendors } = useSelector((state) => state.vendor);
  const { showCreateOrUpdateModal, entryToBeUpdateOrDelete } = useSelector((state) => state.common);

  const vendorColumns = [
    { field: 'vendorName', headerName: 'Name', width: 200 },
    { field: 'contact', headerName: 'contact', width: 200 },
    { field: 'comapny', headerName: 'Comapny', width: 200 },
    { field: 'products', headerName: 'Products', width: 200 },
    { field: 'address', headerName: 'Address', width: 200 },
    {
      field: 'operations', headerName: 'Operations', width: 200, renderCell: (params) => (
        <Box>
          <Button {...editButton} onClick={() => dispatch(saveEntryToBeUpdated(params.row))}>Edit</Button>
          <Button {...editButton} onClick={async () => {
            const result = await dispatch(deleteVendor(params.row.pk))
            if (result.payload.status === 200) toast.warning("Vendor is deleted.")
          }}>Delete</Button>
        </Box>
      )
    },
  ];

  useEffect(() => {
    if (vendors?.length === 0) dispatch(getVendors())
    return () => dispatch(toggleCreateOrUpdateModal())
  }, [])

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Vendors" subtitle="" />
        <Button {...addButton} onClick={() => dispatch(toggleCreateOrUpdateModal({ action: 'create', value: true }))}>Add Vendor</Button>
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
        <DataGrid rows={vendors} columns={vendorColumns} getRowId={(row) => row.pk} />

        {/* Crate or Update vendor modal */}
        <BasicModal 
          handleClose={() => dispatch(toggleCreateOrUpdateModal())}
          open={showCreateOrUpdateModal.create || showCreateOrUpdateModal.update} 
        >
          <Form 
            subtitle=""
            source='vendor'
            inputsFields={vendorFormColumns}
            checkoutSchema={checkoutSchemaOfVendor}
            button={showCreateOrUpdateModal.create ? addButton: editButton}
            title={showCreateOrUpdateModal.create ? "Create Vendor" : "Update Vendor"}
            initialValues={showCreateOrUpdateModal.create ? initialValuesOfVendor : entryToBeUpdateOrDelete}
          />
        </BasicModal>
      </Box>
    </Box>
  );
};

export default Vendor;
