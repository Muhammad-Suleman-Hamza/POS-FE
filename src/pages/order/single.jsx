import { tokens } from "../../theme";
import { toast } from 'react-toastify';
import Form from "../../components/Form";
import Button from '@mui/material/Button';
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import BasicModal from '../../components/Modal';
import { deleteOrder } from "../../store/slices/order";
import { useDispatch, useSelector } from "react-redux";
import { toggleCreateOrUpdateModal, saveEntryToBeUpdated } from "../../store/slices/common";
import { editButton, getOrderFormFields, getSingleOrderColumns } from '../../constants/FormFields';
import {
    addButton,
    initialValuesOfOrder,
    checkoutSchemaOfOrder
} from '../../constants/FormFields'

const SingleOrder = () => {
    const theme = useTheme();
    const { id } = useParams();
    const dispatch = useDispatch();
    const colors = tokens(theme.palette.mode);

    const [order, setOrder] = useState([]);

    const { items } = useSelector((state) => state.item);
    const { orders } = useSelector((state) => state.order);
    const { customers } = useSelector((state) => state.customer);
    const { showCreateOrUpdateModal, entryToBeUpdateOrDelete } = useSelector((state) => state.common);

    const formColumns = getOrderFormFields(items, customers);
    const orderColumns = getSingleOrderColumns(
        'single',
        (params) => `${params.row.pk}`,
        (params) => dispatch(saveEntryToBeUpdated(params.row)),
        async (params) => {
            const result = await dispatch(deleteOrder(params.row.pk))
            if (result.payload.status === 200) toast.warning("Order is deleted.")
        }
    );

    const formatOrders = () => {
        const newOrderStructure = [];
        const localOrder = orders.find((order) => order.pk === id);
        const { price, quantity, orderItem, customerPK, createdDate, customerName, paymentMethodPK, paymentMethodName } = localOrder;

        for (let index = 0; index < orderItem.length; index++) {
            newOrderStructure.push({
                customerPK,
                id: index + 1,
                createdDate,
                customerName,
                paymentMethodPK,
                paymentMethodName,
                price: price[index],
                quantity: quantity[index],
                orderItem: index === 0 ? orderItem[index].orderItemName : orderItem[index][`orderItem-${index + 1}Name`],
            })
        }
        setOrder(newOrderStructure);
    }

    useEffect(() => {
        if (id && !order.length) formatOrders()
        return () => dispatch(toggleCreateOrUpdateModal())
    }, []);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title={`Orders: ${id}`} subtitle="" />
                <Button {...addButton} onClick={() => dispatch(toggleCreateOrUpdateModal({ action: 'create', value: true }))}>Add Order</Button>
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
                    rows={order} 
                    columns={orderColumns} 
                    getRowId={(row) => row.id} 
                    hideFooter
                    unstable_rowSpanning
                    showCellVerticalBorder
                    showColumnVerticalBorder
                    disableRowSelectionOnClick
                />

                <BasicModal
                    handleClose={() => dispatch(toggleCreateOrUpdateModal())}
                    open={showCreateOrUpdateModal.create || showCreateOrUpdateModal.update}
                >
                    <Form
                        subtitle=""
                        source='order'
                        inputsFields={formColumns}
                        checkoutSchema={checkoutSchemaOfOrder}
                        button={showCreateOrUpdateModal.create ? addButton : editButton}
                        title={showCreateOrUpdateModal.create ? "Create Order" : "Update Order"}
                        initialValues={showCreateOrUpdateModal.create ? initialValuesOfOrder : entryToBeUpdateOrDelete}
                    />
                </BasicModal>
            </Box>
        </Box>
    );
};

export default SingleOrder;
