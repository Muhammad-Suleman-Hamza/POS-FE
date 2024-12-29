import Header from "./Header";
import { Formik } from "formik";
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react'
import { addButton } from '../constants/FormFields';
import { paymentMethods } from "../constants/generic";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateItem } from '../store/slices/item';
import { addOrder, updateOrder } from '../store/slices/order';
import { addVendor, updateVendor } from '../store/slices/vendor';
import { addCustomer, updateCustomer } from '../store/slices/customer';
import { Box, Button, TextField, useMediaQuery, MenuItem } from '@mui/material'
import { toggleLoading, toggleCreateOrUpdateModal } from '../store/slices/common';

const Form = ({ cb = undefined, title, button, source = '', subTitle, initialValues, checkoutSchema, inputsFields }) => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { items } = useSelector((state) => state.item);
  const { customers } = useSelector((state) => state.customer);

  const [itemCount, setItemCount] = useState(1);
  const [formInputFields, setFormInputFields] = useState(inputsFields);
  const [formInitialValues, setFormInitialValues] = useState(initialValues);

  const handleFormSubmit = async (values) => {
    console.log('values :: ', values);

    let result = undefined;
    let toastText = undefined;

    if (source === 'order') values = combineOrderAttributes(values);

    if (button.buttonsource === 'add') {
      await dispatch(toggleLoading());
      if (source === 'item') {
        result = await dispatch(addItem(values));
        toastText = "Item is added.";
      }
      else if (source === 'order') {
        result = await dispatch(addOrder(values));
        toastText = "Order is added.";
      }
      else if (source === 'customer') {
        result = await dispatch(addCustomer(values));
        toastText = "Customer is added.";
      }
      else if (source === 'vendor') {
        result = await dispatch(addVendor(values));
        toastText = "Vendor is added.";
      }
      await dispatch(toggleLoading());
    }
    else if (button.buttonsource === 'edit') {
      await dispatch(toggleLoading());
      if (source === 'item') {
        result = await dispatch(updateItem(values));
        toastText = "Item is updated.";
      }
      else if (source === 'order') {
        result = await dispatch(updateOrder(values));
        toastText = "Order is updated.";
      }
      else if (source === 'customer') {
        result = await dispatch(updateCustomer(values));
        toastText = "Customer is updated.";
      }
      else if (source === 'vendor') {
        result = await dispatch(updateVendor(values));
        toastText = "Vendor is updated.";
      }
      await dispatch(toggleLoading());
    }

    if (!result || result?.payload === undefined) toast.error(`Unable to ${button.buttonsource} ${source}`);
    else if (result.payload.status === 200) {
      dispatch(toggleCreateOrUpdateModal())
      toast.success(toastText);
    }

    if (cb && typeof cb === 'function') {
      console.log('pos :: cb called :: ')
      cb();
    }

    console.log(result)
  };

  const getName = (menu, inputField) => {
    console.log('menu :: ', menu);
    console.log('inputField :: ', inputField);
    return inputField.name.includes("orderItem") ? menu.itemName : inputField.name === "customer" ? menu.customerName : menu.name;;
  }

  const addNewItem = (count) => {
    let newFields = [];
    const localCount = count + 1;
    const initalCount = source === 'order' && button.buttonsource === 'edit' ? 2 : count + 1;

    for (let index = initalCount; index <= localCount; index++) {
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

    setFormInputFields((prevFields) => [
      ...prevFields,
      ...newFields
    ])

    setItemCount(localCount)
    setFormInitialValues(prevValues => ({
      ...prevValues,
      itemCount: localCount
    }));
  }

  const combineOrderAttributes = (values) => {
    const item = [];
    const price = [];
    const quantity = [];
    const localCount = itemCount + 1;
    const customer = customers.find((customer) => customer.pk === values.customer);
    const paymentMethod = paymentMethods.find((paymentMethod) => paymentMethod.pk === values.paymentMethod);

    for (let index = 1; index < localCount; index++) {
      const itemPK = values[index === 1 ? 'orderItem' : 'orderItem-' + index];
      const itemObj = items.find((item) => item.pk === itemPK);

      const orderPrice = values[index === 1 ? 'price' : 'price-' + index];
      const orderQuantity = values[index === 1 ? 'quantity' : 'quantity-' + index];

      item.push(itemObj);
      price.push(orderPrice);
      quantity.push(orderQuantity);
    }

    return {
      price,
      quantity,
      customer,
      paymentMethod,
      orderItem: item,
    }
  }

  const getInputValue = (values, name) => {
    let value = values[name];
    if (name === 'customer' || name === 'paymentMethod') value = values[name].pk;
    return value;
  }

  console.log('formInitialValues :: ', formInitialValues);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={title} subtitle={subTitle} />
        {
          source === 'order' ?
            <Button {...addButton} onClick={() => addNewItem(button.buttonsource === 'edit' ? formInitialValues['itemCount'] : itemCount)}>
              Add new order item
            </Button>
            :
            <></>
        }
      </Box>
      <Formik onSubmit={handleFormSubmit} initialValues={formInitialValues} validationSchema={checkoutSchema}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box
              gap="30px"
              display="grid"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
            >
              {
                formInputFields?.map((inputField, index) => (
                  inputField?.inputType === "select" ?
                    <TextField
                      select
                      fullWidth
                      sx={inputField.sx}
                      onBlur={handleBlur}
                      name={inputField.name}
                      onChange={handleChange}
                      label={inputField.label}
                      variant={inputField.variant}
                      key={index + inputField.name}
                      required={inputField.required}
                      value={getInputValue(values, inputField.name)}
                      error={!!touched[inputField.name] && !!errors[inputField.name]}
                      helperText={touched[inputField.name] && errors[inputField.name]}
                    >
                      {
                        inputField?.menuItems.map((menu) =>
                          <MenuItem key={menu.pk} value={menu.pk}>
                            {getName(menu, inputField)}
                          </MenuItem>
                        )
                      }
                    </TextField>
                    :
                    <TextField
                      fullWidth
                      sx={inputField.sx}
                      onBlur={handleBlur}
                      name={inputField.name}
                      onChange={handleChange}
                      label={inputField.label}
                      variant={inputField.variant}
                      key={index + inputField.name}
                      required={inputField.required}
                      value={values[inputField.name]}
                      error={!!touched[inputField.name] && !!errors[inputField.name]}
                      helperText={touched[inputField.name] && errors[inputField.name]}
                    />

                ))
              }
              <Button sx={button.sx} type={button.type} color={button.color} variant={button.variant}>
                {button.title}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default Form