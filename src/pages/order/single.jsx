import { format } from 'date-fns';
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
    const printComponentRef = useRef();
    const colors = tokens(theme.palette.mode);

    const [order, setOrder] = useState([]);
    const [totalBill, setTotalBill] = useState(0);
    // const [printing, setPrinting] = useState(false);
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
                            {params.id === 1 && format(order[params.id - 1]?.createdDate, "dd-MM-yyyy hh:mm:ss a")}
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

    // const handleBeforePrint = useCallback(() => {
    //     setPrinting(!printing);
    // }, [setPrinting]);

    // const handleAfterPrint = () => {
    //     setPrinting(!printing);
    // }

    const handlePrintError = ((errorLocation, error) => {
        console.error(`An error occurred in errorLocation:  ${errorLocation}: ${error}`);
        // setPrinting(!printing);
    });

    const handleReactToPrintFn = useReactToPrint({
        documentTitle: `Order ${id}`,
        contentRef: printComponentRef,
        // onAfterPrint: handleAfterPrint,
        onPrintError: handlePrintError,
        // onBeforePrint: handleBeforePrint,
    });

    useEffect(() => {
        if (id && !order.length) formatOrders()
    }, []);

    // console.log('pos :: printing :: ', printing);

    return (
        <Box m="20px" ref={printComponentRef}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title={`Order: ${id}`} subtitle={`Total Bill: ${totalBill.toLocaleString()} PKR`} />
                <Box className="hide-on-print">
                    <Button {...backButton}><Link to={'/orders'} style={{ ...backButton.anchorsx }}>Back</Link></Button>
                    <Button {...editButton}><Link to={`/orders/update/${currentOrder?.pk}`} style={{ ...backButton.anchorsx }}>Edit</Link></Button>
                    <Button {...editButton} onClick={handleReactToPrintFn}>Print</Button>
                </Box>
            </Box>
            <Box
                m="8px 0 0 0"
                height="80vh"
                className="print-text print-background"
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
                        // className="print-text"
                        // unstable_rowSpanning
                        showCellVerticalBorder
                        showColumnVerticalBorder
                        getRowId={(row) => row.id}
                        columns={getSingleOrderColumns()}
                        className="print-text print-background"
                    />
                }
            </Box>
        </Box>
    );
};

export default ViewOrder;
