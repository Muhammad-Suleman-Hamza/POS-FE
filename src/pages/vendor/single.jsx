import { useEffect, useState } from "react";
import { tokens } from "../../theme";
import { toast } from 'react-toastify';
import Form from "../../components/Form";
import Button from '@mui/material/Button';
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Box, useTheme } from "@mui/material";
import BasicModal from '../../components/Modal';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteVendor } from "../../store/slices/vendor";
import { toggleCreateOrUpdateModal, saveEntryToBeUpdated } from "../../store/slices/common";
import {
    addButton,
    backButton, 
    editButton, 
    getVendorColumns,
    vendorFormColumns,
    initialValuesOfVendor,
    checkoutSchemaOfVendor
} from '../../constants/FormFields'

const SingleVendor = () => {
    const theme = useTheme();
    const { id } = useParams();
    const dispatch = useDispatch();
    const colors = tokens(theme.palette.mode);

    const [vendor, setVendor] = useState([]);

    const { vendors } = useSelector((state) => state.vendor);
    const { showCreateOrUpdateModal, entryToBeUpdateOrDelete } = useSelector((state) => state.common);

    const vendorColumns = getVendorColumns(
        'single',
        (params) => `${params.row.pk}`,
        (params) => dispatch(saveEntryToBeUpdated(params.row)),
        async (params) => {
            const result = await dispatch(deleteVendor(params.row.pk))
            if (result.payload.status === 200) toast.warning("Vendor is deleted.")
        }
    );

    useEffect(() => {
        if (id && !vendor.length) setVendor(vendors.filter((vendor) => vendor.pk === id));
        return () => dispatch(toggleCreateOrUpdateModal())
    }, []);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title={`Vendors: ${id}`} subtitle="" />
                <Button {...backButton}><Link to={'/vendors'} style={{ ...backButton.anchorsx }}>Back</Link></Button>
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
                    rows={vendor}
                    // unstable_rowSpanning
                    showCellVerticalBorder
                    columns={vendorColumns}
                    showColumnVerticalBorder
                    disableRowSelectionOnClick
                    getRowId={(row) => row.pk}
                />

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
                        button={showCreateOrUpdateModal.create ? addButton : editButton}
                        title={showCreateOrUpdateModal.create ? "Create Vendor" : "Update Vendor"}
                        initialValues={showCreateOrUpdateModal.create ? initialValuesOfVendor : entryToBeUpdateOrDelete}
                    />
                </BasicModal>
            </Box>
        </Box>
    );
};

export default SingleVendor;
