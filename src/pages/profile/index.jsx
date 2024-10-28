import { Formik } from "formik";
import { useState } from "react";
import { tokens } from "../../theme";
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Header from "../../components/Header";
import { updateUser } from "../../store/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme, TextField, useMediaQuery } from '@mui/material';
import { checkoutSchemaOfUser, editButton, userFormColumns } from '../../constants/FormFields';

const Profile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [isDisabled, setIsDisabled] = useState(true);

  const { user } = useSelector((state) => state.auth);

  const [initialValuesOfUser, setInitialValuesOfUser] = useState({
    email: user?.email,
    newPassword: undefined,
    currentPassword: undefined
  });

  const handleFormSubmit = async (values, { resetForm }) => {
    console.log('values :: ', values);

    const result = await dispatch(updateUser(values));;

    if (!result || result?.payload === undefined) toast.error(`Unable to update user`);
    else if (result.payload.status === 200) {
      resetForm({});
      closeEditing();
      toast.success("User is updated.");
    }

    console.log(result)
  };

  const closeEditing = () => {
    setIsDisabled(!isDisabled);
    setInitialValuesOfUser({
      email: user?.email,
      newPassword: undefined,
      currentPassword: undefined
    })
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Profile" subtitle="" />
        <Button {...editButton} onClick={closeEditing}>
          {isDisabled ? 'Edit Profile' : 'Cancel'}
        </Button>
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
        <Formik onSubmit={handleFormSubmit} initialValues={initialValuesOfUser} validationSchema={checkoutSchemaOfUser}>
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Box
                gap="30px"
                display="grid"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
              >
                {
                  userFormColumns?.map((inputField, index) => (
                    <>
                      <TextField
                        fullWidth
                        autoComplete='off'
                        sx={inputField.sx}
                        onBlur={handleBlur}
                        name={inputField.name}
                        type={inputField.type}
                        onChange={handleChange}
                        label={inputField.label}
                        variant={inputField.variant}
                        key={index + inputField.name}
                        required={inputField.required}
                        value={values[inputField.name]}
                        disabled={inputField.name === 'email' ? true : isDisabled}
                        error={!!touched[inputField.name] && !!errors[inputField.name]}
                        helperText={touched[inputField.name] && errors[inputField.name]}
                      />
                      <br />
                    </>
                  ))
                }
                {
                  !isDisabled && <Button type={editButton.type} color={editButton.color} variant={editButton.variant} sx={{ gridColumn: "span 2" }}>
                    {editButton.title}
                  </Button>
                }
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Profile;
