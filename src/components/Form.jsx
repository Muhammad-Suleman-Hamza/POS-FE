import React from 'react'
import Header from "./Header";
import { Formik } from "formik";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { addItem, updateItem } from '../store/slices/item';
import { addOrder, updateOrder } from '../store/slices/order';
import { toggleCreateOrUpdateModal } from '../store/slices/common';
import { Box, Button, TextField, useMediaQuery, MenuItem } from '@mui/material'

const Form = ({ title, button, source = '', subTitle, initialValues, checkoutSchema, inputsFields }) => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    console.log('values :: ', values);

    let toastText = undefined;
    let result = undefined;

    if (button.buttonsource === 'add') {
      if (source === 'item') {
        result = await dispatch(addItem(values));
        toastText = "Item is added.";
      }
      else if (source === 'order') {
        result = await dispatch(addOrder(values));
        toastText = "Order is added.";
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
    }

    if (result.payload.status === 200) {
      dispatch(toggleCreateOrUpdateModal())
      toast.success(toastText);
    }

    console.log(result)
  };

  return (
    <Box m="20px">
      <Header title={title} subtitle={subTitle} />
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
                inputsFields?.map((inputField, index) => (
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
                              [`${inputField.name}Name`]: menu.name
                            })}
                          >
                            {menu.name}
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