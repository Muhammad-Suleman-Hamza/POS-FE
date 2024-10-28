import { Box, Typography, useTheme } from "@mui/material";
import ProgressCircle from "./ProgressCircle";
import { tokens } from "../theme";

const StatBox = ({ heading, value }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="20px">
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" sx={{ color: colors.greenAccent[500] }}>
          {heading}
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: colors.grey[100] }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
