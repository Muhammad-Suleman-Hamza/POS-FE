import { tokens } from "../../theme";
import { toast } from 'react-toastify';
import Form from "../../components/Form";
import Button from '@mui/material/Button';
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import BasicModal from "../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { paymentMethods } from "../../constants/generic";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addOrder, updateOrder } from "../../store/slices/order";
import { Box, MenuItem, TextField, useTheme } from "@mui/material";
import { toggleCreateOrUpdateModal } from "../../store/slices/common";
import {
    getLocalStorage,
    setSessionStorage,
    getSessionStorage,
    removeSessionStorage,
} from "../../helpers/storage";
import {
    addButton,
    backButton,
    editButton,
    getEmptyOrder,
    customerFormColumns,
    initialValuesOfCustomer,
    checkoutSchemaOfCustomer,
    getRowButtons,
    getRowRemoveButton
} from '../../constants/FormFields'
import { getItems } from "../../store/slices/item";

const AddOrder = () => {
    const theme = useTheme();
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const source = id ? 'edit' : 'add';
    const colors = tokens(theme.palette.mode);
    const title = id ? `Order: ${id}` : `Add Order`;

    const { items } = useSelector((state) => state.item);
    const { orders } = useSelector((state) => state.order);
    const { customers } = useSelector((state) => state.customer);
    const { showCreateOrUpdateModal } = useSelector((state) => state.common);

    const [order, setOrder] = useState([]);
    const [editable, setEditable] = useState(false);
    const [updatedOrder, setUpdatedOrder] = useState({
        note: [],
        price: [],
        customer: {},
        quantity: [],
        orderItem: [],
        paymentMethod: {}
    });

    const formatOrders = () => {
        const newOrderStructure = [];
        const localOrder = orders.find((order) => order.pk === id);
        const { note, price, quantity, customer, orderItem, createdDate, paymentMethod } = localOrder;

        for (let index = 0; index < orderItem.length; index++) {
            newOrderStructure.push({
                customer,
                createdDate,
                paymentMethod,
                id: index + 1,
                note: note[index],
                price: price[index],
                quantity: quantity[index],
                orderItem: orderItem[index],
                totalPrice: price[index] * quantity[index]
            })
            setOrder(newOrderStructure);
        }
        setUpdatedOrder(localOrder);
    }

    const addNewItemInOrder = () => {
        const { customer, createdDate, paymentMethod } = updatedOrder;
        const newOrder = {
            note: '',
            price: 0,
            customer,
            quantity: 0,
            orderItem: '',
            totalPrice: 0,
            paymentMethod,
            id: order?.length + 1
        };

        if (source === 'edit') {
            newOrder['createdDate'] = createdDate;
            setUpdatedOrder(prevValues => ({ ...prevValues, orderItem: [...updatedOrder.orderItem, newOrder] }));
        }

        if (order?.length) setOrder([...order, newOrder]);
        else setOrder((currentOrder) => [...currentOrder, newOrder]);
    }

    const handleChange = (event, params = undefined) => {
        let result = undefined;
        const { name, value } = event.target;

        if (name === 'customer') result = customers.find((customer) => customer.pk === value)
        else if (name === 'paymentMethod') result = paymentMethods.find((paymentMethod) => paymentMethod.pk === value)
        else if (name === 'orderItem') {
            const newOrderItems = [...order];
            const newItem = { ...items.find((item) => item.pk === value) };
            const checkItemExistInOrderOrNot = newOrderItems.find((order) => order.orderItem.pk === value);
            
            // if (checkItemExistInOrderOrNot) {
            //     toast.warn('Item already exist in order');
            //     return;
            // }

            console.log('pos :: checkItemExistInOrderOrNot :: ', checkItemExistInOrderOrNot);
            newItem['id'] = params.id;
            newOrderItems[params.id - 1]['quantity'] = 0;
            newOrderItems[params.id - 1]['orderItem'] = newItem;
            newOrderItems[params.id - 1]['price'] = Number(newItem?.price);
            newOrderItems[params.id - 1]['totalPrice'] = Number(newItem?.price) * newOrderItems[params.id - 1]?.quantity || 0;

            result = newOrderItems;

            const updatedOrderPrices = [...updatedOrder?.price];
            const updatedOrderItems = [...updatedOrder?.orderItem];

            updatedOrderItems[params.id - 1] = newItem;
            updatedOrderPrices[params.id - 1] = newItem?.price;

            setOrder(result);
            setUpdatedOrder(prevValues => ({
                ...prevValues,
                price: updatedOrderPrices,
                orderItem: updatedOrderItems
            }));
        }
        else if (name === 'price') {
            const newOrderItemsPrice = [...updatedOrder.price];
            newOrderItemsPrice[params.id - 1] = Number(value);
            result = newOrderItemsPrice;
        }
        else if (name === 'note') {
            const newOrderItemsNote = [...updatedOrder.note];
            newOrderItemsNote[params.id - 1] = value;
            result = newOrderItemsNote;
        }
        else if (name === 'quantity') {
            if (updatedOrder?.orderItem?.length) {
                const tempUpdatedOrder = JSON.parse(JSON.stringify(updatedOrder));
                // current item
                const localItem = { ...items.find((item) => item.pk === updatedOrder['orderItem'][params.id - 1]['pk']) };

                // item quantity check with required quantity
                if (value > Number(localItem?.quantity)) {
                    toast.error(`Only ${localItem?.quantity} remaining for ${localItem?.itemName}`);
                    return;
                }

                if (source === 'edit') {
                    const tempOrders = getLocalStorage('orders');
                    const tempCurrentOrder = tempOrders.find((order) => order.pk === id);
                    const tempCurrentOrderItemQuantity = tempCurrentOrder['quantity'][params.id - 1];

                    if (tempCurrentOrderItemQuantity) localItem['quantity'] = (tempCurrentOrderItemQuantity + localItem?.quantity) - value;
                    else localItem['quantity'] = localItem?.quantity - value;
                }
                else {
                    localItem['quantity'] = localItem?.quantity - value;
                }

                tempUpdatedOrder['orderItem'][params.id - 1] = localItem;
                setUpdatedOrder(tempUpdatedOrder);
            }

            const newOrderItemsQuantity = [...updatedOrder.quantity];
            newOrderItemsQuantity[params.id - 1] = Number(value);
            result = newOrderItemsQuantity;
        }
        else if (name === 'totalPrice') result = Number(value);
        else return;

        if (name !== 'orderItem' && result) {
            const orderUpdated = [...order];
            if (name === 'customer' || name === 'paymentMethod') orderUpdated[params.id - 1][name] = result;
            else orderUpdated[params.id - 1][name] = result[params.id - 1];

            if (name === 'quantity') {
                orderUpdated[params.id - 1]['totalPrice'] = Number(value) * updatedOrder['price'][params.id - 1] || 0
            }
            else if (name === 'price') {
                orderUpdated[params.id - 1]['totalPrice'] = Number(value) * updatedOrder['quantity'][params.id - 1] || 0
            }
            else if (name === 'totalPrice') {
                const newOrderItemsPrice = [...updatedOrder.price];
                const perPiecePrice = Number(value) / updatedOrder['quantity'][params.id - 1] || 0;

                newOrderItemsPrice[params.id - 1] = perPiecePrice;
                orderUpdated[params.id - 1]['price'] = perPiecePrice;

                setUpdatedOrder(prevValues => ({
                    ...prevValues,
                    price: newOrderItemsPrice,
                }));
            }

            setOrder(orderUpdated);
            if (name !== 'totalPrice') setUpdatedOrder(prevValues => ({ ...prevValues, [name]: result }));
        }
    }

    const getSingleOrderColumns = () => {
        const columns = source === 'add' ?
            [
                { field: 'id', headerName: 'ID', width: 50, align: "center" },
                {
                    field: 'orderItem', headerName: 'Item', width: 200, display: "flex", valueGetter: (orderItem) => orderItem?.itemName,
                    renderCell: (params) => {
                        return (
                            <TextField
                                select
                                fullWidth
                                type="string"
                                name="orderItem"
                                onChange={(e) => handleChange(e, params)}
                                value={order[params.id - 1]?.orderItem?.pk}
                            >
                                {
                                    items?.map((item) => (
                                        <MenuItem key={item.pk} value={item.pk}>{item.itemName}</MenuItem>
                                    ))
                                }
                            </TextField>
                        );
                    }
                },
                {
                    field: 'price', headerName: 'Single price', width: 200, display: "flex",
                    renderCell: (params) => {
                        return (
                            <TextField
                                fullWidth
                                type="number"
                                name="price"
                                value={order[params.id - 1]?.price}
                                onChange={(e) => handleChange(e, params)}
                            />
                        );
                    }
                },
                {
                    field: 'quantity', headerName: 'Quantity', width: 200, display: "flex",
                    renderCell: (params) => {
                        return (
                            <TextField
                                fullWidth
                                type="number"
                                name="quantity"
                                value={order[params.id - 1]?.quantity}
                                onChange={(e) => handleChange(e, params)}
                            />
                        );
                    }
                },
                {
                    field: 'totalPrice', headerName: 'Total Price', width: 200, display: "flex",
                    renderCell: (params) => {
                        return (
                            <TextField
                                fullWidth
                                type="number"
                                name="totalPrice"
                                value={order[params.id - 1]?.totalPrice}
                                onChange={(e) => handleChange(e, params)}
                            />
                        );
                    }
                },
                {
                    field: 'customer', headerName: 'Customer', width: 200, display: "flex", valueGetter: (customer) => customer?.customerName,
                    renderCell: (params) => {
                        return (
                            params.id === 1 &&
                            <TextField
                                select
                                fullWidth
                                type="string"
                                name="customer"
                                onChange={(e) => handleChange(e, params)}
                                value={order[params.id - 1]?.customer?.pk}
                            >
                                <MenuItem key={'new'} value={'new'} onClick={handleNewCustomer}>Add Customer</MenuItem>
                                {
                                    customers?.map((customer) => (
                                        <MenuItem key={customer.pk} value={customer.pk}>{customer.customerName}</MenuItem>
                                    ))
                                }
                            </TextField>
                        );
                    }
                },
                {
                    field: 'paymentMethod', headerName: 'Payment method', width: 200, display: "flex", valueGetter: (paymentMethod) => paymentMethod?.name,
                    renderCell: (params) => {
                        return (
                            params.id === 1 && <TextField
                                select
                                fullWidth
                                type="string"
                                name="paymentMethod"
                                onChange={(e) => handleChange(e, params)}
                                value={order[params.id - 1]?.paymentMethod?.pk}
                            >
                                {
                                    paymentMethods?.map((paymentMethod) => (
                                        <MenuItem key={paymentMethod.pk} value={paymentMethod.pk}>{paymentMethod.name}</MenuItem>
                                    ))
                                }
                            </TextField>
                        );
                    }
                },
                {
                    field: 'note', headerName: 'Note', width: 400, display: "flex",
                    renderCell: (params) => {
                        return (
                            <TextField
                                rows={2}
                                fullWidth
                                multiline
                                name="note"
                                label="Note"
                                value={order[params.id - 1]?.note || ''}
                                onChange={(e) => handleChange(e, params)}
                                onKeyDown={(e) => e.key === ' ' && e.code === 'Space' && e.stopPropagation()}
                            />
                        );
                    }
                },
                // { field: 'remove', headerName: 'Remove', width: 100, renderCell: (params) => getRowRemoveButton(params, deleteOnClick) },
            ]
            :
            [
                { field: 'id', headerName: 'ID', width: 200, align: "center" },
                {
                    field: 'orderItem', headerName: 'Item', width: 200, display: "flex", valueGetter: (orderItem) => orderItem?.itemName,
                    renderCell: (params) => {
                        return (
                            <TextField
                                select
                                fullWidth
                                type="string"
                                name="orderItem"
                                onChange={(e) => handleChange(e, params)}
                                value={order[params.id - 1]?.orderItem?.pk}
                            >
                                {
                                    items?.map((item) => (
                                        <MenuItem key={item.pk} value={item.pk}>{item.itemName}</MenuItem>
                                    ))
                                }
                            </TextField>
                        );
                    }
                },
                {
                    field: 'price', headerName: 'Single price', width: 200, display: "flex",
                    renderCell: (params) => {
                        return (
                            <TextField
                                fullWidth
                                name="price"
                                type="number"
                                value={order[params.id - 1]?.price}
                                onChange={(e) => handleChange(e, params)}
                            />
                        );
                    }
                },
                {
                    field: 'quantity', headerName: 'Quantity', width: 200, display: "flex",
                    renderCell: (params) => {
                        return (
                            <TextField
                                fullWidth
                                type="number"
                                name="quantity"
                                value={order[params.id - 1]?.quantity}
                                onChange={(e) => handleChange(e, params)}
                            />
                        );
                    }
                },
                {
                    field: 'totalPrice', headerName: 'Total Price', width: 200, display: "flex",
                    renderCell: (params) => {
                        return (
                            <TextField
                                fullWidth
                                type="number"
                                name="totalPrice"
                                value={order[params.id - 1]?.totalPrice}
                                onChange={(e) => handleChange(e, params)}
                            />
                        );
                    }
                },
                {
                    field: 'customer', headerName: 'Customer', width: 200, display: "flex", valueGetter: (customer) => customer?.customerName,
                    renderCell: (params) => {
                        return (
                            <>
                                {
                                    params.id === 1 ?
                                        <TextField
                                            select
                                            fullWidth
                                            type="string"
                                            name="customer"
                                            onChange={(e) => handleChange(e, params)}
                                            value={order[params.id - 1]?.customer?.pk}
                                        >
                                            {
                                                customers?.map((customer) => (
                                                    <MenuItem key={customer.pk} value={customer.pk}>{customer.customerName}</MenuItem>
                                                ))
                                            }
                                        </TextField>
                                        :
                                        <>
                                            {params.id === 1 && order[params.id - 1]?.customer?.customerName}
                                        </>
                                }
                            </>
                        );
                    }
                },
                {
                    field: 'createdDate', headerName: 'Purchase Date', width: 200, display: "flex",
                    renderCell: (params) => {
                        return (
                            <>
                                {
                                    params.id === 1 ?
                                        <TextField
                                            fullWidth
                                            type="date"
                                            name="createdDate"
                                            value={order[params.id - 1]?.createdDate}
                                            onChange={(e) => handleChange(e, params)}
                                        />
                                        :
                                        <>
                                            {params.id === 1 && order[params.id - 1]?.createdDate}
                                        </>
                                }
                            </>
                        );
                    }
                },
                {
                    field: 'paymentMethod', headerName: 'Payment method', width: 200, display: "flex", valueGetter: (paymentMethod) => paymentMethod?.name,
                    renderCell: (params) => {
                        return (
                            <>
                                {
                                    params.id === 1 ?
                                        <TextField
                                            select
                                            fullWidth
                                            type="string"
                                            name="paymentMethod"
                                            onChange={(e) => handleChange(e, params)}
                                            value={order[params.id - 1]?.paymentMethod?.pk}
                                        >
                                            {
                                                paymentMethods?.map((paymentMethod) => (
                                                    <MenuItem key={paymentMethod.pk} value={paymentMethod.pk}>{paymentMethod.name}</MenuItem>
                                                ))
                                            }
                                        </TextField>
                                        :
                                        <>
                                            {params.id === 1 && order[params.id - 1]?.paymentMethod?.pk}
                                        </>
                                }
                            </>
                        );
                    }
                },
                {
                    field: 'note', headerName: 'Note', width: 400, display: "flex",
                    renderCell: (params) => {
                        return (
                            <TextField
                                rows={2}
                                fullWidth
                                multiline
                                name="note"
                                label="Note"
                                type="string"
                                value={order[params.id - 1]?.note}
                                onChange={(e) => handleChange(e, params)}
                                onKeyDown={(e) => e.key === ' ' && e.code === 'Space' && e.stopPropagation()}
                            />
                        );
                    }
                }
            ];

        return columns;
    }

    const handleAddOrder = async () => {
        const result = await dispatch(addOrder(updatedOrder));
        console.log(result)

        if (!result || result?.payload === undefined) toast.error(`Unable to add order.`);
        else if (result.payload.status === 200) {
            removeSessionStorage('updateOrder');
            removeSessionStorage('tempOrder');
            toast.success("Order is added.");
            await dispatch(getItems());
            setOrder([getEmptyOrder()]);
            setUpdatedOrder({});
            navigate("/orders");
        }
    }

    const handleUpdateOrder = async () => {
        const result = await dispatch(updateOrder(updatedOrder));
        console.log(result)

        if (!result || result?.payload === undefined) toast.error(`Unable to update order.`);
        else if (result.payload.status === 200) {
            toast.success("Order is updated.");
            await dispatch(getItems());
            setEditable(!editable);
            navigate("/orders");
        }

    }

    const handleNewCustomer = async () => {
        // upon adding new customer, order state was getting empty
        // To handle that issue i have added order temporary in sesson storage
        setSessionStorage('tempOrder', order);
        setSessionStorage('tempUpdatedOrder', updatedOrder);
        await dispatch(toggleCreateOrUpdateModal({ action: 'create', value: true }));
    }

    const handleCustomerAddedCB = () => {
        const tempOrder = getSessionStorage('tempOrder');
        const tempCustomer = getLocalStorage('customers');
        const tempUpdatedOrder = getSessionStorage('tempUpdatedOrder');

        const newCustomer = tempCustomer[customers.length];

        tempUpdatedOrder['customer'] = newCustomer;
        const updatedTempOrder = tempOrder.map(o => ({
            ...o,
            customer: newCustomer
        }));

        setOrder(updatedTempOrder);
        setUpdatedOrder(tempUpdatedOrder);

        setSessionStorage('tempOrder', updatedTempOrder);
        setSessionStorage('tempUpdatedOrder', tempUpdatedOrder);
    }

    const deleteOnClick = ({ id }) => {
        if (order.length === 1) {
            toast.error('At least 1 item should be in order');
        }
        else {
            const filteredOrders = order?.filter((o) => o.id !== id);
            const filteredPrices = updatedOrder?.price.filter((p, index) => index !== id - 1);
            const filteredQuantity = updatedOrder?.quantity.filter((q, index) => index !== id - 1);

            setOrder([...filteredOrders]);
            toast.success('Item removed from order');
            setUpdatedOrder(
                prevValues => ({
                    ...prevValues,
                    price: filteredPrices,
                    orderItem: filteredOrders,
                    quantity: filteredQuantity
                })
            );
        }
    }

    console.log('pos :: order :: ', order);
    console.log('pos :: updatedOrder :: ', updatedOrder);

    useEffect(() => {
        const tempOrder = getSessionStorage('tempOrder');
        const tempUpdatedOrder = getSessionStorage('tempUpdatedOrder');
        if (tempOrder) {
            setOrder(tempOrder);
            setUpdatedOrder(tempUpdatedOrder);
            setTimeout(() => {
                removeSessionStorage('tempOrder');
                removeSessionStorage('tempUpdatedOrder');
            }, 2000);
        }
        else if (id && source === 'edit' && !order?.length) formatOrders()
        else if (!id && source === 'add' && !order?.length) addNewItemInOrder();
    }, []);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title={title} subtitle="" />
                <Box>
                    <Button {...backButton}><Link to={'/orders'} style={{ ...backButton.anchorsx }}>Back</Link></Button>
                    <Button {...editButton} onClick={addNewItemInOrder}>Add new item</Button>
                    <Button {...editButton} onClick={source === 'add' ? handleAddOrder : handleUpdateOrder}>Save</Button>
                </Box>
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
                {
                    order?.length &&
                    customers?.length &&
                    paymentMethods?.length &&
                    <DataGrid
                        rows={order}
                        rowHeight={80}
                        // unstable_rowSpanning
                        showCellVerticalBorder
                        showColumnVerticalBorder
                        getRowId={(row) => row.id}
                        columns={getSingleOrderColumns()}
                    />
                }
            </Box>

            {/* customer modal */}
            <BasicModal
                open={showCreateOrUpdateModal.create}
                handleClose={() => dispatch(toggleCreateOrUpdateModal())}
            >
                <Form
                    subtitle=""
                    source="customer"
                    button={addButton}
                    title={"Create Customer"}
                    cb={handleCustomerAddedCB}
                    inputsFields={customerFormColumns}
                    initialValues={initialValuesOfCustomer}
                    checkoutSchema={checkoutSchemaOfCustomer}
                />
            </BasicModal>
        </Box>
    );
};

export default AddOrder;
