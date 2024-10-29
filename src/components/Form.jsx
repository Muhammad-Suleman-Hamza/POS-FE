import Header from "./Header";
import { Formik } from "formik";
import { toast } from 'react-toastify';
import React, { useState } from 'react'
import { addButton } from '../constants/FormFields';
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateItem } from '../store/slices/item';
import { addOrder, updateOrder } from '../store/slices/order';
import { addVendor, updateVendor } from '../store/slices/vendor';
import { toggleCreateOrUpdateModal } from '../store/slices/common';
import { addCustomer, updateCustomer } from '../store/slices/customer';
import { Box, Button, TextField, useMediaQuery, MenuItem } from '@mui/material'

const Form = ({ title, button, source = '', subTitle, initialValues, checkoutSchema, inputsFields }) => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  const { items } = useSelector((state) => state.item);

  const [itemCount, setItemCount] = useState(1);
  const [formInputFields, setFormInputFields] = useState(inputsFields);

  const handleFormSubmit = async (values) => {
    console.log('values :: ', values);

    let toastText = undefined;
    let result = undefined;

    if (source === 'order' && itemCount > 1) values = combineOrderItems(values);

    if (button.buttonsource === 'add') {
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
    }
    else if (button.buttonsource === 'edit') {
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
    }

    if (!result || result?.payload === undefined) toast.error(`Unable to ${button.buttonsource} ${source}`);
    else if (result.payload.status === 200) {
      dispatch(toggleCreateOrUpdateModal())
      toast.success(toastText);
    }

    console.log(result)
  };

  const getName = (menu, inputField) => {
    return inputField.name.includes("orderItem") ? menu.itemName : inputField.name === "customer" ? menu.customerName : menu.name;;
  }

  const addNewItem = () => {
    let newFields = [];
    const localCount = itemCount + 1;

    for (let index = localCount; index <= localCount; index++) {
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
  }
  
  const combineOrderItems = (values) => {
    const item = [];
    const price = [];
    const quantity = [];
    const localCount = itemCount + 1;

    for (let index = 1; index < localCount; index++) {
      const orderPrice = values[index === 1 ? 'price' : 'price-'+ index]
      const orderQuantity = values[index === 1 ? 'quantity' : 'quantity-'+ index]
      const orderItem = JSON.parse(values[index === 1 ? 'orderItem' : 'orderItem-'+ index])
    
      item.push(orderItem)
      price.push(orderPrice)
      quantity.push(orderQuantity)
    }

    return {
      price,
      quantity,
      orderItem: item,
      customer: values.customer,
      paymentMethod: values.paymentMethod
    }
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={title} subtitle={subTitle} />
        {source === 'order' ? <Button {...addButton} onClick={addNewItem}>Add New Item</Button> : <></>}
      </Box>
      <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
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
                      value={values[inputField.name]}
                      error={!!touched[inputField.name] && !!errors[inputField.name]}
                      helperText={touched[inputField.name] && errors[inputField.name]}
                    >
                      {
                        inputField?.menuItems.map((menu) =>
                          <MenuItem
                            key={menu.pk}
                            value={JSON.stringify({
                              [`${inputField.name}PK`]: menu.pk,
                              [`${inputField.name}Name`]: getName(menu, inputField)
                            })}
                          >
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