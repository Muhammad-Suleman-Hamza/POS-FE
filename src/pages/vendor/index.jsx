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
import { deleteVendor, getVendors } from "../../store/slices/vendor";
import { DeleteConfirmation } from "../../components/DeleteConfirmation";
import { editButton, getVendorColumns } from '../../constants/FormFields';
import { 
  toggleLoading,
  saveEntryToBeUpdated,
  toggleCreateOrUpdateModal, 
  toggleDeleteConfirmationModal,
} from "../../store/slices/common";
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

  const vendorColumns = getVendorColumns(
    '',
    (params) => `${params.row.pk}`,
    (params) => dispatch(saveEntryToBeUpdated(params.row)),
    (params) => dispatch(toggleDeleteConfirmationModal(params.row))
  );


  const deleteCB = async () => {
    await dispatch(toggleLoading());
    const result = await dispatch(deleteVendor(entryToBeUpdateOrDelete.pk));
    if (result.payload.status === 200) toast.success("Vendor is deleted.");
      await dispatch(toggleLoading()); 
  }

  useEffect(() => {
    if (!vendors) dispatch(getVendors())
    return () => dispatch(toggleCreateOrUpdateModal())
  }, [])

  return (
    <Box m="20px">
      <Box m="10px">
        <Header title="Vendors" subtitle="" />
      </Box>
      <Box m="10px">
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
        <DataGrid
          rows={vendors}
          // unstable_rowSpanning
          showCellVerticalBorder
          columns={vendorColumns}
          showColumnVerticalBorder
          disableRowSelectionOnClick
          getRowId={(row) => row?.pk}
        />

        {/* Crate or Update vendor modal */}
        <BasicModal
          handleClose={() => dispatch(toggleCreateOrUpdateModal())}
          open={showCreateOrUpdateModal.create || showCreateOrUpdateModal.update}
        >
          <Form
            subtitle=""
            source="vendor"
            inputsFields={vendorFormColumns}
            checkoutSchema={checkoutSchemaOfVendor}
            button={showCreateOrUpdateModal.create ? addButton : editButton}
            title={showCreateOrUpdateModal.create ? "Create Vendor" : "Update Vendor"}
            initialValues={showCreateOrUpdateModal.create ? initialValuesOfVendor : entryToBeUpdateOrDelete}
          />
        </BasicModal>

        <DeleteConfirmation cb={deleteCB} />
      </Box>
    </Box>
  );
};

export default Vendor;
