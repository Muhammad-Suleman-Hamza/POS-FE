import { format } from "date-fns";
import { tokens } from "../../theme";
import Grid from '@mui/material/Grid2';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { viewButton } from "../../constants/FormFields";
import { Box, useTheme, Typography } from "@mui/material";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { orders } = useSelector((state) => state.order);
  const [todayOrders, setTodayOrders] = useState([]);

  const columns = [
    { label: "Order Number", width: 300 },
    { label: "Customer Name", width: 200 },
    { label: "Total Bill", width: 300 },
    { label: "Payment", width: 100 },
    { label: "Purchased Time", width: 300 },
  ];

  const calculateTotalOrderPrice = (order) => {
    let totalBill = 0;
    const { price, quantity } = order;

    for (let index = 0; index < price.length; index++) {
      totalBill = totalBill + (price[index] * quantity[index]);
    }

    return totalBill;
  };

  const getTodayOrders = () => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0]; // "YYYY-MM-DD"

    const todayOrders = orders?.filter(order => {
      const orderDate = new Date(order.createdDate).toISOString().split('T')[0];
      return orderDate === todayStr;
    });
    setTodayOrders(todayOrders);
  }

  useEffect(() => {
    getTodayOrders();
  }, [orders])

  return (
    <Box m="20px">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={12}>
          <Box
            backgroundColor={colors.primary[400]}
            maxHeight="100vh"
            overflow="auto"
            m="25px 0 0 0"
          >
            <Box
              p="15px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              borderBottom={`4px solid ${colors.greenAccent[500]}`}
            >
              <Typography
                variant="h3"
                fontWeight="600"
                color={colors.greenAccent[500]}
              >
                Today Orders ({format(new Date(), "dd-MM-yyyy")})
              </Typography>
            </Box>
            {
              todayOrders?.length ?
                <Box
                  p="15px"
                  display="flex"
                  alignItems="center"
                  color={colors.grey[100]}
                  justifyContent="space-between"
                  borderBottom={`4px solid ${colors.greenAccent[500]}`}
                >
                  {columns.map((col, index) => (
                    <Typography
                      key={index}
                      variant="h4"
                      fontWeight="600"
                      width={col.width}
                      color={colors.blueAccent[300]}
                    >
                      {col.label}
                    </Typography>
                  ))}
                </Box>
                :
                <></>
            }
            {
              todayOrders?.length ?
                todayOrders?.map((order, i) => (
                  <Link to={`/orders/view/${order.pk}`} style={{ ...viewButton.anchorsx }}>
                    <Box
                      p="15px"
                      display="flex"
                      alignItems="center"
                      key={`${order}-${i}`}
                      justifyContent="space-between"
                      borderBottom={`4px solid ${colors.primary[500]}`}
                    >
                      <Box width={columns[0]}>
                        <Typography
                          variant="h5"
                          fontWeight="600"
                          color={colors.greenAccent[100]}
                        >
                          {order?.pk}
                        </Typography>
                      </Box>
                      <Box width={columns[1]}>
                        <Typography
                          variant="h5"
                          fontWeight="600"
                          color={colors.greenAccent[100]}
                        >
                          {order?.customer?.customerName}
                        </Typography>
                      </Box>
                      <Box width={columns[2]}>
                        <Typography
                          variant="h5"
                          fontWeight="600"
                          color={colors.greenAccent[100]}
                        >
                          {calculateTotalOrderPrice(order).toLocaleString()} PKR
                        </Typography>
                      </Box>
                      <Box width={columns[3]}>
                        <Typography
                          variant="h5"
                          fontWeight="600"
                          color={colors.greenAccent[100]}
                        >
                          {order?.paymentMethod?.name}
                        </Typography>
                      </Box>
                      <Box width={columns[4]}>
                        <Typography
                          variant="h5"
                          fontWeight="600"
                          color={colors.greenAccent[100]}
                        >
                          {order?.createdDate}
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                ))
                :
                <Box
                  p="15px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                >
                  <Typography
                    variant="h3"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    No order today
                  </Typography>
                </Box>
            }
          </Box>
        </Grid>
      </Grid>
    </Box >
  );
};

export default Dashboard;
