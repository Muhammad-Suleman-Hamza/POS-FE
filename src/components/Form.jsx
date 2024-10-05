import React from 'react'
import Header from "./Header";
import { Formik } from "formik";
import { useMediaQuery } from "@mui/material";
import { Box, Button, TextField } from '@mui/material'

const Form = ({title, subTitle, button, initialValues, checkoutSchema, inputsFields}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title={title} subtitle={subTitle} />
      <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, }) => (
          <form onSubmit={handleSubmit}>
            <Box
              gap="30px"
              display="grid"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
            >
              {
                inputsFields?.map((inputField, index) => (
                  <TextField
                    fullWidth
                    sx={inputField.sx}
                    onBlur={handleBlur}
                    name={inputField.name}
                    onChange={handleChange}
                    label={inputField.label}
                    key={index+inputField.name}
                    variant={inputField.variant}
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