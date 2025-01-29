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
import { deleteItem } from "../../store/slices/item";
import { useDispatch, useSelector } from "react-redux";
import { toggleCreateOrUpdateModal, saveEntryToBeUpdated } from "../../store/slices/common";
import {
    addButton,
    backButton,
    editButton,
    getItemColumns,
    itemFormColumns,
    initialValuesOfItem,
    checkoutSchemaOfItem,
} from '../../constants/FormFields'

const SingleItem = () => {
    const theme = useTheme();
    const { id } = useParams();
    const dispatch = useDispatch();
    const colors = tokens(theme.palette.mode);

    const [item, setItem] = useState([]);

    const { items } = useSelector((state) => state.item);
    const { showCreateOrUpdateModal, entryToBeUpdateOrDelete } = useSelector((state) => state.common);

    const itemColumns = getItemColumns(
        'single',
        (params) => `${params.row.pk}`,
        (params) => dispatch(saveEntryToBeUpdated(params.row)),
        async (params) => {
            const result = await dispatch(deleteItem(params.row.pk))
            if (result.payload.status === 200) toast.warning("Item is deleted.")
        }
    );

    useEffect(() => {
        if (id && !item.length) setItem(items.filter((item) => item.pk === id));
        return () => dispatch(toggleCreateOrUpdateModal())
    }, []);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title={`Item: ${id}`} subtitle="" />
                <Button {...backButton}><Link to={'/items'} style={{ ...backButton.anchorsx }}>Back</Link></Button>
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
                    rows={item}
                    // unstable_rowSpanning
                    showCellVerticalBorder
                    showColumnVerticalBorder
                    columns={itemColumns}
                    disableRowSelectionOnClick
                    getRowId={(row) => row.pk}
                />
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

export default SingleItem;
