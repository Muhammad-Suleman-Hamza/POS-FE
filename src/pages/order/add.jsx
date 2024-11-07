import { useState } from "react";
import { tokens } from "../../theme";
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { addOrder } from "../../store/slices/order";
import { useDispatch, useSelector } from "react-redux";
import { paymentMethods } from "../../constants/generic";
import { Box, MenuItem, TextField, useTheme } from "@mui/material";
import { backButton, editButton, getEmptyOrder } from '../../constants/FormFields'

const AddOrder = () => {
    const theme = useTheme();
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const colors = tokens(theme.palette.mode);

    const { items } = useSelector((state) => state.item);
    const { customers } = useSelector((state) => state.customer);

    const [order, setOrder] = useState([getEmptyOrder()]);

    const [updatedOrder, setUpdatedOrder] = useState({
        price: [],
        customer: {},
        quantity: [],
        orderItem: [],
        createdDate: "",
        paymentMethod: {},
    });

    const addNewItemInOrder = () => {
        const { customer, createdDate, paymentMethod } = updatedOrder;
        const newOrder = {
            customer,
            createdDate,
            orderItem: '',
            paymentMethod,
            price: undefined,
            quantity: undefined,
            id: order.length + 1
        };

        setOrder((currentOrder) => [...currentOrder, newOrder])
    }

    const handleChange = (event, params = undefined) => {
        let result = undefined;
        const { name, value } = event.target;

        if (name === 'customer') result = customers.find((customer) => customer.pk === value)
        else if (name === 'paymentMethod') result = paymentMethods.find((paymentMethod) => paymentMethod.pk === value)
        else if (name === 'orderItem') {
            const newOrderItems = [...order];
            const newItem = { ...items.find((order) => order.pk === value) };
            newItem['id'] = params.id;
            newOrderItems[params.id - 1]['orderItem'] = newItem;
            result = newOrderItems;

            const updatedOrderItems = updatedOrder?.orderItem;
            updatedOrderItems[params.id-1] = newItem;
            
            setOrder(result);
            setUpdatedOrder(prevValues => ({ ...prevValues, [name]: updatedOrderItems }));
        }
        else if (name === 'price') {
            const newOrderItemsPrice = [...updatedOrder.price];
            newOrderItemsPrice[params.id - 1] = value;
            result = newOrderItemsPrice;
        }
        else if (name === 'quantity') {
            const newOrderItemsQuantity = [...updatedOrder.quantity];
            newOrderItemsQuantity[params.id - 1] = value;
            result = newOrderItemsQuantity;
        }
        else if (name === 'createdDate') {
            result = value;
        }
        else return;

        if (result) {
            if (name !== 'orderItem') {
                const updatedProp = [...order];
                if (name === 'customer' || name === 'paymentMethod') updatedProp[params.id - 1][name] = result;
                else updatedProp[params.id - 1][name] = result[params.id - 1];
                setOrder(updatedProp);
                setUpdatedOrder(prevValues => ({ ...prevValues, [name]: result }));
            }
        }
    }

    const getSingleOrderColumns = () => {
        const columns = [
            { field: 'id', headerName: 'ID', width: 200 },
            {
                field: 'orderItem', headerName: 'Item', width: 200, valueGetter: (orderItem) => orderItem?.itemName,
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
                field: 'price', headerName: 'Price', width: 200,
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
                field: 'quantity', headerName: 'Quantity', width: 200,
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
                field: 'customer', headerName: 'Customer', width: 200, valueGetter: (customer) => customer?.customerName,
                renderCell: (params) => {
                    return (
                        params.id === 1 && <TextField
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
                    );
                }
            },
            {
                field: 'createdDate', headerName: 'Purchase Date', width: 200,
                renderCell: (params) => {
                    return (
                        params.id === 1 && <TextField
                            fullWidth
                            type="date"
                            name="createdDate"
                            value={order[params.id - 1]?.createdDate}
                            onChange={(e) => handleChange(e, params)}
                        />
                    );
                }
            },
            {
                field: 'paymentMethod', headerName: 'Payment method', width: 200, valueGetter: (paymentMethod) => paymentMethod?.name,
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
        ];

        return columns;
    }

    const handleAddOrder = async () => {
        const result = await dispatch(addOrder(updatedOrder));
        console.log(result)

        setOrder([getEmptyOrder()]);
        setUpdatedOrder({});

        if (!result || result?.payload === undefined) toast.error(`Unable to add order.`);
        else if (result.payload.status === 200) {
            toast.success("Order is added.");

            setTimeout(() => {
                navigate("/orders"); 
            }, 2000);
        }
    }

    console.log('order :: ', order);
    console.log('updatedOrder :: ', updatedOrder);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title={`Add Order`} subtitle="" />
                <Box>
                    {Object.keys(updatedOrder).length ? <Button {...editButton} onClick={handleAddOrder}>Save</Button> : <></>}
                    <Button {...editButton} onClick={addNewItemInOrder}>Add item</Button>
                    <Button {...backButton}><Link to={'/orders'} style={{ ...backButton.anchorsx }}>Back</Link></Button>
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
                    order.length &&
                    customers.length &&
                    paymentMethods.length &&
                    <DataGrid
                        rows={order}
                        // unstable_rowSpanning
                        showCellVerticalBorder
                        showColumnVerticalBorder
                        getRowId={(row) => row.id}
                        columns={getSingleOrderColumns()}
                    />
                }
            </Box>
        </Box>
    );
};

export default AddOrder;
