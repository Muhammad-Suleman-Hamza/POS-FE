import { tokens } from "../../theme";
import Grid from '@mui/material/Grid2';
import { useSelector } from "react-redux";
import StatBox from "../../components/StatBox";
import BarChart from "../../components/BarChart";
import LineChart from "../../components/LineChart";
import { Box, useTheme, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { items } = useSelector((state) => state.item);
  const { orders } = useSelector((state) => state.order);
  const { vendors } = useSelector((state) => state.vendor);
  const { customers } = useSelector((state) => state.customer);

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

  return (
    <Box m="20px">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {/* Stats */}
        {
          stats.map((stats, index) => (
            <Grid key={index} size={3}>
              <Box
                width="100%"
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

        {/* <Grid
          xs={12}
          sm={12}
          md={8}
          lg={8}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid xs={12}>
            <Box backgroundColor={colors.primary[400]}>
              <Box
                mt="25px"
                p="0 30px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Today Generated
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.greenAccent[500]}
                  >
                    $58,373,698
                  </Typography>
                </Box>
              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <LineChart isDashboard={true} />
              </Box>
            </Box>
          </Grid>

          <Grid xs={12} sm={12} md={12}>
            <Box backgroundColor={colors.primary[400]}>
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}
              >
                Today Quantity
              </Typography>
              <Box height="250px" mt="-20px">
                <BarChart isDashboard={true} />
              </Box>
            </Box>
          </Grid>
        </Grid> */}

        {/* Recent Orders */}
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
              borderBottom={`4px solid ${colors.primary[500]}`}
            >
              <Typography
                variant="h3"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Recent Orders
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              color={colors.grey[100]}
              p="15px"
            >
              <Typography
                width={200}
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Customer
              </Typography>
              <Typography
                width={100}
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Price
              </Typography>
              <Typography
                width={100}
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Payment
              </Typography>
              <Typography
                width={200}
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Purchased Time
              </Typography>
            </Box>
            {orders?.map((order, i) => (
              <Box
                p="15px"
                display="flex"
                alignItems="center"
                key={`${order}-${i}`}
                justifyContent="space-between"
                borderBottom={`4px solid ${colors.primary[500]}`}
              >
                <Box width={200}>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.greenAccent[100]}
                  >
                    {order?.customer?.customerName}
                  </Typography>
                </Box>
                <Box width={100}>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.greenAccent[100]}
                  >
                    {order?.price?.reduce((accumulator, currentValue) => accumulator + Number(currentValue), 0)}
                  </Typography>
                </Box>
                <Box width={100}>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.greenAccent[100]}
                  >
                    {order?.paymentMethod?.name}
                  </Typography>
                </Box>
                <Box width={200}>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.greenAccent[100]}
                  >
                    {order?.createdDate}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
