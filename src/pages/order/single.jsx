import { tokens } from "../../theme";
import Button from '@mui/material/Button';
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Box, useTheme } from "@mui/material";
import { useReactToPrint } from 'react-to-print';
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { backButton, editButton } from '../../constants/FormFields'

const ViewOrder = () => {
    const theme = useTheme();
    const { id } = useParams();
    const printAbleComponent = useRef();
    const colors = tokens(theme.palette.mode);
    const reactToPrintFn = useReactToPrint({ printAbleComponent });

    const [order, setOrder] = useState([]);
    const [totalBill, setTotalBill] = useState(0);
    const [currentOrder, setCurrentOrder] = useState({});

    const { orders } = useSelector((state) => state.order);

    const formatOrders = () => {
        let tempTotalBill = 0;
        const newOrderStructure = [];
        const localOrder = orders.find((order) => order.pk === id);
        const { note, price, quantity, customer, orderItem, createdDate, paymentMethod } = localOrder;

        for (let index = 0; index < orderItem.length; index++) {
            tempTotalBill = tempTotalBill + (price[index] * quantity[index]);
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

        setTotalBill(tempTotalBill);
        setCurrentOrder(localOrder);
    }

    const getSingleOrderColumns = () => {
        const columns = [
            { field: 'id', headerName: 'ID', width: 50 },
            {
                field: 'orderItem', headerName: 'Item', width: 200, valueGetter: (orderItem) => orderItem?.itemName,
                renderCell: (params) => {
                    return (
                        <>
                            {order[params.id - 1]?.orderItem?.itemName}
                        </>
                    );
                }
            },
            {
                field: 'price', headerName: 'Single price', width: 100,
                renderCell: (params) => {
                    return (

                        <>
                            {order[params.id - 1]?.price}
                        </>
                    );
                }
            },
            {
                field: 'quantity', headerName: 'Quantity', width: 100,
                renderCell: (params) => {
                    return (
                        <>
                            {order[params.id - 1]?.quantity}
                        </>
                    );
                }
            },
            {
                field: 'totalPrice', headerName: 'Total Price', width: 100,
                renderCell: (params) => {
                    return (

                        <>
                            {order[params.id - 1]?.totalPrice}
                        </>
                    );
                }
            },
            {
                field: 'customer', headerName: 'Customer', width: 150, valueGetter: (customer) => customer?.customerName,
                renderCell: (params) => {
                    return (
                        <>
                            {params.id === 1 && order[params.id - 1]?.customer?.customerName}
                        </>

                    );
                }
            },
            {
                field: 'createdDate', headerName: 'Purchase Date', width: 180,
                renderCell: (params) => {
                    return (

                        <>
                            {params.id === 1 && order[params.id - 1]?.createdDate}
                        </>
                    );
                }
            },
            {
                field: 'paymentMethod', headerName: 'Payment method', width: 120, valueGetter: (paymentMethod) => paymentMethod?.name,
                renderCell: (params) => {
                    return (
                        <>
                            {params.id === 1 && order[params.id - 1]?.paymentMethod?.pk}
                        </>
                    );
                }
            },
            {
                field: 'note', headerName: 'Note', width: 400,
                renderCell: (params) => {
                    return (
                        <>
                            {order[params.id - 1]?.note}
                        </>
                    );
                }
            },
        ];

        return columns;
    }

    useEffect(() => {
        if (id && !order.length) formatOrders()
    }, []);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title={`Order: ${id}`} subtitle={`Total Bill: ${totalBill.toLocaleString()} PKR`} />
                <Box>
                    <Button {...backButton}><Link to={'/orders'} style={{ ...backButton.anchorsx }}>Back</Link></Button>
                    <Button {...editButton}><Link to={`/orders/update/${currentOrder?.pk}`} style={{ ...backButton.anchorsx }}>Edit</Link></Button>
                    <Button {...editButton} onClick={() => reactToPrintFn()}>Print</Button>
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
                    <DataGrid
                        rows={order}
                        // unstable_rowSpanning
                        showCellVerticalBorder
                        ref={printAbleComponent}
                        showColumnVerticalBorder
                        getRowId={(row) => row.id}
                        columns={getSingleOrderColumns()}
                    />
                }
            </Box>
        </Box>
    );
};

export default ViewOrder;
