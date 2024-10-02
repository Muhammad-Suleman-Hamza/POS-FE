import Form from "../form";
import { tokens } from "../../theme";
import React, { useState } from "react";
import Button from '@mui/material/Button';
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Box, useTheme } from "@mui/material";
import { mockItems } from "../../data/mockData";
import BasicModal from '../../components/Modal';
import { itemColumns } from "../../constants/tableColumns";
import {
  addbuttonOfItem,
  inputsFieldsOfItem,
  initialValuesOfItem,
  checkoutSchemaOfItem
} from '../../constants/FormFields'

const Item = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Items" subtitle="" />
        <Button {...addbuttonOfItem} onClick={handleOpen}>Add Item</Button>
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
        <DataGrid rows={mockItems} columns={itemColumns} />

        <BasicModal open={open} handleClose={handleClose}>
          <Form title={"Create Item"} subtitle=""
            button={addbuttonOfItem}
            inputsFields={inputsFieldsOfItem}
            initialValues={initialValuesOfItem}
            checkoutSchema={checkoutSchemaOfItem}
          />
        </BasicModal>
      </Box>
    </Box>
  );
};

export default Item;
