import { tokens } from "../../theme";
import { toast } from 'react-toastify';
import Form from "../../components/Form";
import Button from '@mui/material/Button';
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Box, useTheme } from "@mui/material";
import BasicModal from '../../components/Modal';
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders } from "../../store/slices/order";
import { toggleCreateOrUpdateModal, saveEntryToBeUpdated } from "../../store/slices/common";
import { editButton, getOrderColumns, getOrderFormFields } from '../../constants/FormFields';
import {
  addButton,
  initialValuesOfOrder,
  checkoutSchemaOfOrder
} from '../../constants/FormFields'

const Order = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);

  const { items } = useSelector((state) => state.item);
  const { orders } = useSelector((state) => state.order);
  const { customers } = useSelector((state) => state.customer);
  const { showCreateOrUpdateModal, entryToBeUpdateOrDelete } = useSelector((state) => state.common);

  const [formColumns, setFormColumns] = useState(getOrderFormFields(items, customers));
  
  const orderColumns = getOrderColumns(
    '',
    (params) => `${params.row.pk}`,
    (params) => handleEditOrder(params.row),
    async (params) => {
      const result = await dispatch(deleteOrder(params.row.pk))
      if (result.payload.status === 200) toast.warning("Order is deleted.")
    }
  );

  const addNewItem = (count) => {
    let newFields = [];

    for (let index = 2; index <= count + 1; index++) {
      newFields = [
        ...newFields,
        {
          type: "string",
          fullWidth: true,
          menuItems: items,
          variant: "filled",
          inputType: "select",
          sx: { gridColumn: "span 2" },
          name: `orderItem-${index}`,
          label: `Select Item ${index}`
        },
        {
          type: "number",
          fullWidth: true,
          variant: "filled",
          inputType: "input",
          name: `price-${index}`,
          sx: { gridColumn: "span 2" },
          label: `Price for item ${index}`
        },
        {
          type: "string",
          fullWidth: true,
          variant: "filled",
          inputType: "input",
          name: `quantity-${index}`,
          sx: { gridColumn: "span 2" },
          label: `Quantity for item ${index}`
        }
      ]
    }

    setFormColumns((prevFields) => [
      ...prevFields,
      ...newFields
    ])
  }

  const destructOrderAttributes = (values, count) => {
    const newValuesStructure = { ...values };
    newValuesStructure['itemCount'] = count;
 
    for (let index = 1; index <= count; index++) {
      const pricePropName = index === 1 ? 'price' : 'price-' + index;
      const orderPropName = index === 1 ? 'orderItem' : 'orderItem-' + index;
      const quantityPropName = index === 1 ? 'quantity' : 'quantity-' + index;

      newValuesStructure[pricePropName] = values['price'][index - 1];
      newValuesStructure[quantityPropName] = values['quantity'][index - 1];
      newValuesStructure[orderPropName] = values['orderItem'][index - 1]['pk'];
    }

    return newValuesStructure;
  }

  const handleEditOrder = (order) => {
    const count = order?.orderItem?.length;

    addNewItem(count-1);
    const newOrderStructure = destructOrderAttributes(order, count);
    dispatch(saveEntryToBeUpdated(newOrderStructure))
  }

  useEffect(() => {
    if (orders?.length === 0) dispatch(getOrders());
    if (showCreateOrUpdateModal?.update) ;

    return () => dispatch(toggleCreateOrUpdateModal())
  }, [])

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Orders" subtitle="" />
        <Button {...addButton} onClick={() => dispatch(toggleCreateOrUpdateModal({ action: 'create', value: true }))}>Add Order</Button>
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

        <BasicModal
          handleClose={() => dispatch(toggleCreateOrUpdateModal())}
          open={showCreateOrUpdateModal.create || showCreateOrUpdateModal.update}
        >
          <Form
            subtitle=""
            source='order'
            inputsFields={formColumns}
            checkoutSchema={checkoutSchemaOfOrder}
            button={showCreateOrUpdateModal.create ? addButton : editButton}
            title={showCreateOrUpdateModal.create ? "Create Order" : "Update Order"}
            initialValues={showCreateOrUpdateModal.create ? initialValuesOfOrder : entryToBeUpdateOrDelete}
          />
        </BasicModal>
      </Box>
    </Box>
  );
};

export default Order;
