import { format } from 'date-fns';
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
import { toggleCreateOrUpdateModal, toggleLoading } from "../../store/slices/common";
import {
    Box,
    useTheme,
    MenuItem,
    TextField,
    Autocomplete
} from "@mui/material";
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
    getRowRemoveButton,
    customerFormColumns,
    initialValuesOfCustomer,
    checkoutSchemaOfCustomer,
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
    const [remove, setRemove] = useState(false);
    const [update, setUpdate] = useState(false);
    const [totalBill, setTotalBill] = useState(0);
    const [editable, setEditable] = useState(false);
    const [updatedOrder, setUpdatedOrder] = useState({
        note: [],
        price: [],
        customer: {},
        quantity: [],
        orderItem: [],
        pendingAmount: 0,
        receivedAmount: 0,
        paymentMethod: {}
    });

    const formatOrders = () => {
        let tempTotalBill = 0;
        const newOrderStructure = [];
        const localOrder = orders.find((order) => order.pk === id);
        const { note, price, quantity, customer, orderItem, createdDate, paymentMethod, pendingAmount, receivedAmount } = localOrder;

        for (let index = 0; index < orderItem.length; index++) {
            tempTotalBill = tempTotalBill + (price[index] * quantity[index]);

            newOrderStructure.push({
                customer,
                paymentMethod,
                id: index + 1,
                note: note[index],
                price: price[index],
                quantity: quantity[index],
                orderItem: orderItem[index],
                totalPrice: price[index] * quantity[index],
                createdDate: format(createdDate, "yyyy-MM-dd")
            })
            setOrder(newOrderStructure);
        }
        setTotalBill(tempTotalBill);
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

        // if (name === 'createdDate') result = value;
        if (name === 'customer') result = customers.find((customer) => customer.pk === value)
        else if (name === 'paymentMethod') result = paymentMethods.find((paymentMethod) => paymentMethod.pk === value)
        else if (name === 'orderItem') {
            const newOrderItems = [...order];
            const newItem = { ...items.find((item) => item.pk === value) };

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
                    toast.error(`${localItem?.quantity || 0} remaining for ${localItem?.itemName}`);
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
        else if (name === 'totalPrice') result = value;
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
                orderUpdated[params.id - 1]['totalPrice'] = Number(value);

                setUpdatedOrder(prevValues => ({
                    ...prevValues,
                    price: newOrderItemsPrice,
                }));
            }

            setOrder(orderUpdated);
            if (name !== 'totalPrice') setUpdatedOrder(prevValues => ({ ...prevValues, [name]: result }));
        }
        setUpdate(true);
    }

    const getSingleOrderColumns = () => {
        const columns = source === 'add' ?
            [
                { field: 'id', headerName: 'ID', width: 50, align: "center" },
                {
                    field: 'customer', headerName: 'Customer', width: 250, display: "flex", valueGetter: (customer) => customer?.customerName,
                    renderCell: (params) => {
                        return (
                            params.id === 1 &&
                            <Autocomplete
                                fullWidth
                                getOptionLabel={(option) => option.customerName || ""}
                                isOptionEqualToValue={(option, value) => option.pk === value.pk}
                                options={[{ pk: "new", customerName: "➕ Add Customer" }, ...customers]}
                                value={customers.find(customer => customer.pk === order[params.id - 1]?.customer?.pk) || null}
                                renderInput={(params) => (
                                    <TextField {...params} label="Select Customer" variant="outlined" />
                                )}
                                onChange={(event, newValue) => {
                                    if (newValue?.pk === "new") {
                                        handleNewCustomer();
                                    } else {
                                        handleChange({ target: { name: "customer", value: newValue?.pk } }, params);
                                    }
                                }}
                            />
                        );
                    }
                },
                {
                    field: 'orderItem', headerName: 'Item', width: 300, display: "flex", valueGetter: (orderItem) => orderItem?.itemName,
                    renderCell: (params) => {
                        return (
                            <Autocomplete
                                fullWidth
                                options={items}
                                getOptionLabel={(option) => option.itemName}
                                isOptionEqualToValue={(option, value) => option.pk === value.pk}
                                value={items.find(item => item.pk === order[params.id - 1]?.orderItem?.pk) || null}
                                renderInput={(params) => (
                                    <TextField {...params} label="Select Item" variant="outlined" />
                                )}
                                onChange={(event, newValue) => {
                                    handleChange({ target: { name: "orderItem", value: newValue?.pk } }, params);
                                }}
                                renderOption={(props, option) => (
                                    <MenuItem {...props} key={option.pk} value={option.pk} disabled={order.some(o => o.orderItem?.pk === option.pk)}>
                                        {option.itemName}
                                    </MenuItem>
                                )}
                            />
                        );
                    }
                },
                {
                    field: 'price', headerName: 'Single price', width: 150, display: "flex",
                    renderCell: (params) => {
                        return (
                            <TextField
                                fullWidth
                                name="price"
                                type="number"
                                value={order[params.id - 1]?.price}
                                onChange={(e) => {
                                    const valueCheck = parseFloat(e.target.value);
                                    if (valueCheck > 0) handleChange(e, params);
                                }}
                            />
                        );
                    }
                },
                {
                    field: 'quantity', headerName: 'Quantity', width: 150, display: "flex",
                    renderCell: (params) => {
                        return (
                            <TextField
                                fullWidth
                                type="number"
                                name="quantity"
                                value={order[params.id - 1]?.quantity}
                                onChange={(e) => {
                                    const valueCheck = parseFloat(e.target.value);
                                    if (valueCheck > 0) handleChange(e, params);
                                }}
                            />
                        );
                    }
                },
                {
                    field: 'totalPrice', headerName: 'Total Price', width: 150, display: "flex",
                    renderCell: (params) => {
                        return (
                            <TextField
                                fullWidth
                                type="number"
                                name="totalPrice"
                                value={order[params.id - 1]?.totalPrice}
                                onChange={(e) => {
                                    const valueCheck = parseFloat(e.target.value);
                                    if (valueCheck > 0) handleChange(e, params);
                                }}
                            />
                        );
                    }
                },
                {
                    field: 'paymentMethod', headerName: 'Payment method', width: 150, display: "flex", valueGetter: (paymentMethod) => paymentMethod?.name,
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
                    field: 'note', headerName: 'Note', width: 300, display: "flex",
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
                { field: 'remove', headerName: 'Remove', width: 100, renderCell: (params) => getRowRemoveButton(params, deleteOnClick) },
            ]
            :
            [
                { field: 'id', headerName: 'ID', width: 50, align: "center" },
                {
                    field: 'customer', headerName: 'Customer', width: 250, display: "flex", valueGetter: (customer) => customer?.customerName,
                    renderCell: (params) => {
                        return (
                            <>
                                {
                                    params.id === 1 ?
                                        <Autocomplete
                                            fullWidth
                                            options={customers}
                                            getOptionLabel={(option) => option.customerName || ""}
                                            isOptionEqualToValue={(option, value) => option.pk === value.pk}
                                            value={customers.find(customer => customer.pk === order[params.id - 1]?.customer?.pk) || null}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Select Customer" variant="outlined" />
                                            )}
                                            onChange={(event, newValue) => {
                                                handleChange({ target: { name: "customer", value: newValue?.pk } }, params);
                                            }}
                                        />
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
                    field: 'orderItem', headerName: 'Item', width: 300, display: "flex", valueGetter: (orderItem) => orderItem?.itemName,
                    renderCell: (params) => {
                        return (
                            <Autocomplete
                                fullWidth
                                options={items}
                                getOptionLabel={(option) => option.itemName || ""}
                                isOptionEqualToValue={(option, value) => option.pk === value.pk}
                                getOptionDisabled={(option) => order.some(o => o.orderItem?.pk === option.pk)}
                                value={items.find(item => item.pk === order[params.id - 1]?.orderItem?.pk) || null}
                                renderInput={(params) => (
                                    <TextField {...params} label="Select Item" variant="outlined" />
                                )}
                                onChange={(event, newValue) => {
                                    handleChange({ target: { name: "orderItem", value: newValue?.pk } }, params);
                                }}
                            />
                        );
                    }
                },
                {
                    field: 'price', headerName: 'Single price', width: 150, display: "flex",
                    renderCell: (params) => {
                        return (
                            <TextField
                                fullWidth
                                name="price"
                                type="number"
                                value={order[params.id - 1]?.price}
                                onChange={(e) => {
                                    const valueCheck = parseFloat(e.target.value);
                                    if (valueCheck > 0) handleChange(e, params);
                                }}
                            />
                        );
                    }
                },
                {
                    field: 'quantity', headerName: 'Quantity', width: 150, display: "flex",
                    renderCell: (params) => {
                        return (
                            <TextField
                                fullWidth
                                type="number"
                                name="quantity"
                                value={order[params.id - 1]?.quantity}
                                onChange={(e) => {
                                    const valueCheck = parseFloat(e.target.value);
                                    if (valueCheck > 0) handleChange(e, params);
                                }}
                            />
                        );
                    }
                },
                {
                    field: 'totalPrice', headerName: 'Total Price', width: 150, display: "flex",
                    renderCell: (params) => {
                        return (
                            <TextField
                                fullWidth
                                type="number"
                                name="totalPrice"
                                value={order[params.id - 1]?.totalPrice}
                                onChange={(e) => {
                                    const valueCheck = parseFloat(e.target.value);
                                    if (valueCheck > 0) handleChange(e, params);
                                }}
                            />
                        );
                    }
                },
                {
                    field: 'createdDate', headerName: 'Purchase Date', width: 150, display: "flex",
                    renderCell: (params) => {
                        return (
                            <>
                                {params.id === 1 && format(order[params.id - 1]?.createdDate, "dd-MM-yyyy hh:mm:ss a")}
                            </>
                        );
                    }
                },
                {
                    field: 'paymentMethod', headerName: 'Payment method', width: 150, display: "flex", valueGetter: (paymentMethod) => paymentMethod?.name,
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
                    field: 'note', headerName: 'Note', width: 300, display: "flex",
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
                                onKeyDown={(e) => e.key === ' ' && e.code === 'Space' && e.stopPropagation()} // handle mui space bar issue
                            />
                        );
                    }
                },
                // { field: 'remove', headerName: 'Remove', width: 100, renderCell: (params) => getRowRemoveButton(params, deleteOnClick) },
            ];

        return columns;
    }

    const handleAddOrder = async () => {
        if (updatedOrder?.receivedAmount === 0) {
            toast.error('Please add received amount.');
            return;
        }
        else if (Object.keys(updatedOrder.customer).length === 0) {
            toast.error('Please add customer.');
            return;
        }
        else if (Object.keys(updatedOrder?.paymentMethod).length === 0) {
            toast.error('Please add payment method.');
            return;
        }
        else if (updatedOrder?.price?.length !== updatedOrder?.quantity?.length) {
            toast.error('Please add price and quantity for each item.');
            return;
        }


        await dispatch(toggleLoading());
        await formatCustomerLedger();
      
        const result = await dispatch(addOrder(updatedOrder));
        console.log(`add order :: `, result);

        if (!result || result?.payload === undefined) toast.error(`Unable to add order.`);
        else if (result.payload.status === 200) {
            removeSessionStorage('updateOrder');
            removeSessionStorage('tempOrder');
            toast.success("Order is added.");
            await dispatch(getItems());
            setOrder([getEmptyOrder()]);
            dispatch(toggleLoading());
            setUpdatedOrder({});
            navigate(`/orders/view/${result.payload.data.pk}`);
        }
    }

    const handleUpdateOrder = async () => {
        if (updatedOrder?.receivedAmount?.length === 0) {
            toast.error('Please add received amount.');
            return;
        }
        else if (Object.values(updatedOrder?.customer)?.length === 0) {
            toast.error('Please add customer.');
            return;
        }
        else if (Object.values(updatedOrder?.paymentMethod)?.length === 0) {
            toast.error('Please add payment method.');
            return;
        }
        else if (updatedOrder?.price?.length !== updatedOrder?.quantity?.length) {
            toast.error('Please add price and quantity for each item.');
            return;
        }

        await dispatch(toggleLoading());
        const result = await dispatch(updateOrder(updatedOrder));
        console.log(`update order :: `, result);

        if (!result || result?.payload === undefined) toast.error(`Unable to update order.`);
        else if (result.payload.status === 200) {
            toast.success("Order is updated.");
            await dispatch(getItems());
            dispatch(toggleLoading());
            setEditable(!editable);
            navigate(`/orders/view/${id}`);
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
            return;
        }

        const filteredPlaneOrders = order?.filter((o) => o.id !== id);
        const filteredUpdatedOrderItem = updatedOrder?.orderItem.filter((o) => o.id !== id);
        const filteredPrices = updatedOrder?.price.filter((_, index) => index !== id - 1);
        const filteredQuantity = updatedOrder?.quantity.filter((_, index) => index !== id - 1);

        setRemove(true);
        setOrder(filteredPlaneOrders);
        toast.success('Item removed from order');
        setUpdatedOrder((prevValues) => ({
            ...prevValues,
            price: filteredPrices,
            quantity: filteredQuantity,
            orderItem: filteredUpdatedOrderItem,
        }));
    };

    const generatePK = () => {
        let randomNumber = '';
        for (let i = 0; i < 12; i++) {
            randomNumber += Math.floor(Math.random() * 10).toString();
        }
        return randomNumber;
    }

    const handleAmounts = (event) => {
        const { value } = event.target;
        const { price, quantity } = updatedOrder;

        const ta = price?.reduce((prevAmount, p, i) => prevAmount + (p * quantity[i]), 0);
        const ra = Number(value);
        const pa = ta - ra;

        setUpdatedOrder((prevValues) => ({
            ...prevValues,
            totalAmount: ta,
            pendingAmount: pa,
            receivedAmount: ra,
        }));
    }

    const formatCustomerLedger = () => {
        const { customer, totalAmount, pendingAmount, receivedAmount, paymentMethod } = updatedOrder;

        const customerLedger = customer?.ledger || [];

        customerLedger.push({
            note: '',
            totalAmount,
            pendingAmount,
            orderPK: null,
            receivedAmount,
            pk: generatePK(),
            customerPK: customer?.pk,
            paymentMethod: paymentMethod.name,
            createdDate: new Date().toUTCString()
        })

        customer['ledger'] = customerLedger;

        setUpdatedOrder((prevValues) => ({
            ...prevValues,
            customer,
        }));
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

    useEffect(() => {
        if (remove) {
            setRemove(false);
            const filteredOrders = order.map((o, index) => ({ ...o, id: index + 1 }));
            const filteredUpdatedOrder = updatedOrder?.orderItem.map((o, index) => ({ ...o, id: index + 1 }));

            setOrder([...filteredOrders]);
            setUpdatedOrder(
                prevValues => ({
                    ...prevValues,
                    orderItem: filteredUpdatedOrder,
                })
            );
        }
    }, [remove])

    useEffect(() => {
        if (update) {
            setUpdate(false);
            const tempTotalBill = order.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
            setTotalBill(tempTotalBill);
        }
    }, [update])

    return (
        <Box m="20px" mr="0">
            <Box m="10px">
                <Header title={title} />
            </Box>
            <Box m="10px" ml="-10px">
                <Button {...backButton}><Link to={'/orders'} style={{ ...backButton.anchorsx }}>Back</Link></Button>
                <Button {...editButton} onClick={addNewItemInOrder}>Add new item</Button>
                <Button {...editButton} onClick={source === 'add' ? handleAddOrder : handleUpdateOrder}>Save</Button>
            </Box>
            <Box m="10px">
                <Header title={`Total Bill: ${totalBill.toLocaleString()} PKR`} />
            </Box>
            <Box m="10px" display='flex' gap='10px'>
                <Header subtitle={`Pending Amount: ${updatedOrder?.price?.length && updatedOrder?.quantity?.length ? updatedOrder?.pendingAmount?.toLocaleString() : '0'} PKR`} />
            </Box>
            <Box m="10px" display='flex' gap='9px'>
                <Header subtitle={`Received Amount: ${totalBill === 0 ? '0 PKR' : ''}`} />
                {
                    updatedOrder?.price?.length > 0 && updatedOrder?.quantity?.length > 0 ?
                        <TextField
                            type="number"
                            name="receivedAmount"
                            value={updatedOrder?.receivedAmount}
                            onChange={(e) => {
                                const valueCheck = parseFloat(e.target.value);
                                if (valueCheck > 0) handleAmounts(e);
                            }}
                        />
                        :
                        <></>
                }
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
                    rowHeight={80}
                    // unstable_rowSpanning
                    showCellVerticalBorder
                    showColumnVerticalBorder
                    getRowId={(row) => row.id}
                    columns={getSingleOrderColumns()}
                />
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
