import './login.css';
import { useState } from "react";
import Box from "@mui/material/Box";
import { tokens } from "../../theme";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { login } from '../../store/slices/auth';
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);

  const [userDetails, setUserDetails] = useState({
    email: '',
    password: ''
  });

  const onChagneHandler = (e) => {
    setUserDetails({...userDetails, [e.target.name]: e.target.value})
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(userDetails))
  }

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="#">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <Grid container component="main" className={'root'}>
      <CssBaseline />
      <Grid
        item
        square
        sm={8}
        md={5}
        xs={12}
        elevation={1}
        component={Paper}
        className={'size'}
        backgroundColor={colors.primary[400]}
      >
        <div className={'paper'}>
          <Avatar className={'avatar'}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form className={'form'} noValidate>
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
              margin="normal"
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              onChange={onChagneHandler}
              value={userDetails.password}
            />
            <Button
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              className={'submit'}
              onClick={submitHandler}
            >
              Log In
            </Button>
            {/* <Box mt={5}>
              <Copyright />
            </Box> */}
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
