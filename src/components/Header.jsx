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
        color={colors.grey[100]}
        className={`${titleClass} page-title`}
      >
        {title}
      </Typography>
      <Typography 
        variant="h4" 
        color={colors.greenAccent[400]}
        className={`${subTitleClass} page-sub-title`}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
