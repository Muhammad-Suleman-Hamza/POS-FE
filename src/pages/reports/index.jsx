import { useState } from "react";
import { tokens } from "../../theme";
import Grid from '@mui/material/Grid2';
import { useSelector } from "react-redux";
import 'react-date-range/dist/styles.css';
import { format, addDays } from 'date-fns';
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { datePickerButton } from "../../constants/FormFields";
import { Box, Button, Typography, useTheme } from "@mui/material";

const Reports = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { items } = useSelector((state) => state.item);
    const { orders } = useSelector((state) => state.order);
    const { vendors } = useSelector((state) => state.vendor);
    const { customers } = useSelector((state) => state.customer);

    const [showPicker, setShowPicker] = useState(false);
    const [date, setDate] = useState([
        {
            key: 'selection',
            startDate: new Date(),
            endDate: addDays(new Date(), 0)
        }
    ]);

    const stats = [
        {
            value: items?.length,
            heading: "Total Items",
        },
        {
            value: orders?.length,
            heading: "Total Orders",
        },
        {
            value: vendors?.length,
            heading: "Total Vendors",
        },
        {
            value: customers?.length,
            heading: "Total Customers",
        }
    ]

    const datePickerHandler = () => {
        setShowPicker(!showPicker);
        if (showPicker) queryOnDates();
    }

    const queryOnDates = () => {
        console.log('pos :: start date :: ', date[0].startDate);
        console.log('pos :: end date :: ', date[0].endDate);
    }

    const getReportsRage = () => {
        const end = format(date[0].endDate, 'yyyy-MM-dd');
        const start = format(date[0].startDate, 'yyyy-MM-dd');

        return <><b>From:</b> {start} - <b>To:</b> {end}</>;
    }

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Reports:" subtitle={getReportsRage()} parentClass="datePickerHeaderStyling"/>
                <Button {...datePickerButton} onClick={datePickerHandler}>
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
                        onChange={item => setDate([item.selection])}
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