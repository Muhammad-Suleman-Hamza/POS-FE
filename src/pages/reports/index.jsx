import { tokens } from "../../theme";
import Grid from '@mui/material/Grid2';
import { useSelector } from "react-redux";
import 'react-date-range/dist/styles.css';
import { format, addDays } from 'date-fns';
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { Box, Button, useTheme } from "@mui/material";
import { datePickerButton } from "../../constants/FormFields";

const Reports = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { items } = useSelector((state) => state.item);
    const { orders } = useSelector((state) => state.order);
    const { vendors } = useSelector((state) => state.vendor);
    const { customers } = useSelector((state) => state.customer);

    const [showItems, setShowItems] = useState(items);
    const [showOrders, setShowOrders] = useState(orders);
    const [showVendors, setShowVendors] = useState(vendors);
    const [showCustomers, setShowCustomers] = useState(customers);

    const [showPicker, setShowPicker] = useState(false);
    const [date, setDate] = useState([
        {
            key: 'selection',
            startDate: new Date(),
            endDate: addDays(new Date(), 1)
        }
    ]);

    const stats = [
        {
            value: showItems?.length,
            heading: "Total Items",
        },
        {
            value: showOrders?.length,
            heading: "Total Orders",
        },
        {
            value: showVendors?.length,
            heading: "Total Vendors",
        },
        {
            value: showCustomers?.length,
            heading: "Total Customers",
        }
    ]

    const handleDatePicker = () => {
        setShowPicker(!showPicker);
        if (showPicker) getReports();
    }

    const getReports = () => {
        let tempItems = items;
        let tempOrders = orders;
        let tempVendors = vendors;
        let tempCustomers = customers;

        if (!date[0].startDate) {
            tempItems = items.filter((item) => dateChecker(item.createdDate));
            tempOrders = orders.filter((order) => dateChecker(order.createdDate));
            tempVendors = vendors.filter((vendor) => dateChecker(vendor.createdDate));
            tempCustomers = customers.filter((customer) => dateChecker(customer.createdDate));
        }
        
        setShowItems(tempItems);
        setShowOrders(tempOrders);
        setShowVendors(tempVendors);
        setShowCustomers(tempCustomers);
    }

    const getReportsDateRange = () => {
        const end = format(date[0].endDate, 'dd-MM-yyyy');
        const start = format(date[0].startDate, 'dd-MM-yyyy');

        return <><b>From:</b> {start} - <b>To:</b> {end}</>;
    }

    const dateChecker = (dateToBeChecked) => {
        const end = format(date[0].endDate, 'dd-MM-yyyy');
        const start = format(date[0].startDate, 'dd-MM-yyyy');

        return format(dateToBeChecked, 'dd-MM-yyyy') >= start && format(dateToBeChecked, 'dd-MM-yyyy') <= end;
    }

    useEffect(() => {
        getReports();
    }, [])

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Reports:" subtitle={getReportsDateRange()} parentClass="datePickerHeaderStyling" />
                <Button {...datePickerButton} onClick={handleDatePicker}>
                    {showPicker ? "Close" : "Pick Date"}
                </Button>
                {
                    showPicker &&
                    <DateRangePicker
                        months={2}
                        ranges={date}
                        direction="horizontal"
                        className="date-picker"
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        onChange={(item) => setDate([item.selection])}
                    />
                }
            </Box>

            <Box mb={5}>
                <Grid container rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {/* All Stats */}
                    {
                        stats.map((stats, index) => (
                            <Grid key={index} size={3}>
                                <Box
                                    width="100%"
                                    height="80px"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    backgroundColor={colors.primary[400]}
                                >
                                    <StatBox
                                        value={stats.value}
                                        heading={stats.heading}
                                    />
                                </Box>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Box>
    );
};

export default Reports;