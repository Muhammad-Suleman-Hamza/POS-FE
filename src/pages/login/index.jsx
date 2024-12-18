import './login.css';
import { useState } from "react";
import { tokens } from "../../theme";
import { toast } from 'react-toastify';
import Grid from '@mui/material/Grid2';
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Box, useTheme } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import { login } from '../../store/slices/auth';
import Typography from "@mui/material/Typography";
import { getItems } from '../../store/slices/item';
import CssBaseline from "@mui/material/CssBaseline";
import { getOrders } from '../../store/slices/order';
import { getVendors } from '../../store/slices/vendor';
import { useDispatch, useSelector } from "react-redux";
import { toggleLoading } from '../../store/slices/common';
import { getCustomers } from '../../store/slices/customer';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);

  const { items } = useSelector((state) => state.item);
  const { orders } = useSelector((state) => state.order);
  const { vendors } = useSelector((state) => state.vendor);
  const { customers } = useSelector((state) => state.customer);

  const [userDetails, setUserDetails] = useState({
    email: '',
    password: ''
  });

  const onChagneHandler = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    await dispatch(toggleLoading());
    e.preventDefault();
    const result = await dispatch(login(userDetails))
    if (result?.payload?.status === 200) {
      await getDataOnce()
      toast.success('Logged in succesfully');
      navigate('/');
    } else toast.error(result?.payload?.message);
    await dispatch(toggleLoading());
  }

  const getDataOnce = async () => {
    if (!items) await dispatch(getItems());
    if (!orders) await dispatch(getOrders());
    if (!vendors) await dispatch(getVendors());
    if (!customers) await dispatch(getCustomers());
  }

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        Innovento LLC
        {" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <Grid
      container
      component="main"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CssBaseline />
      <Grid
        item
        sm={8}
        md={5}
        xs={12}
        elevation={1}
        component={Paper}
        sx={{
          padding: 3,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: colors.primary[400],
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form noValidate onSubmit={submitHandler} sx={{ width: '100%', mt: 1 }}>
          <TextField
            required
            fullWidth
            autoFocus
            id="email"
            name="email"
            label="Email"
            margin="normal"
            variant="outlined"
            value={userDetails.email}
            onChange={onChagneHandler}
          />
          <TextField
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            margin="normal"
            type="password"
            variant="outlined"
            value={userDetails.password}
            onChange={onChagneHandler}
          />
          <Button
            fullWidth
            type="submit"
            color="primary"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </form>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
