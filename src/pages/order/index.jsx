import { useEffect } from "react";
import { tokens } from "../../theme";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Box, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders } from "../../store/slices/order";
import { addButton, getOrderColumns } from '../../constants/FormFields';

const Order = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);

  const { orders } = useSelector((state) => state.order);

  const orderColumns = getOrderColumns(
    '',
    (params) => `view/${params.row.pk}`,
    undefined,
    async (params) => {
      const result = await dispatch(deleteOrder(params.row.pk))
      if (result.payload.status === 200) toast.warning("Order is deleted.")
    }
  );

  useEffect(() => {
    if (orders?.length === 0) dispatch(getOrders());
  }, [])

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Orders" subtitle="" />
        <Button {...addButton}><Link to={'add'} style={{ ...addButton.anchorsx }}>Add Order</Link></Button>
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
          rows={orders}
          unstable_rowSpanning
          columns={orderColumns}
          showCellVerticalBorder
          showColumnVerticalBorder
          disableRowSelectionOnClick
          getRowId={(row) => row.pk}
        />
      </Box>
    </Box>
  );
};

export default Order;
