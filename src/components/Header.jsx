import React from "react";
import { tokens } from "../theme";
import Grid from '@mui/material/Grid2';
import { Typography, Box, useTheme } from "@mui/material";

const Header = ({ title, subtitle, parentClass, titleClass = '', subTitleClass = '' }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="30px" className={parentClass}>
      <Typography
        variant="h2"
        fontWeight="bold"
        sx={{ mb: "5px" }}
        className={titleClass}
        color={colors.grey[100]}
      >
        {title}
      </Typography>
      <Typography 
        variant="h4" 
        className={subTitleClass}
        color={colors.greenAccent[400]}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
