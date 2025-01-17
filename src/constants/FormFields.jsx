import * as yup from 'yup';
import { format } from 'date-fns';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { paymentMethods, rights } from './generic';
import { getSessionStorage } from '../helpers/storage';

// Item
export const initialValuesOfItem = {
    price: "",
    weight: "",
    quantity: "",
    itemName: "",
    dimensions: "",
    measuringUnit: "",
};

export const checkoutSchemaOfItem = yup.object().shape({
    price: yup.number().required("Required"),
    quantity: yup.number().required("Required"),
    // weight: yup.string().required("Required"),
    itemName: yup.string().required("Required"),
    // dimensions: yup.string().required("Required"),
    // measuringUnit: yup.string().required("Required"),
})

export const getItemColumns = (source = '', redirect, editOnClick, deleteOnClick) => {
    const columns = [
        { field: 'pk', headerName: 'ID', width: 100 },
        { field: 'itemName', headerName: 'Name', width: 200 },
        { field: 'price', headerName: 'Price', width: 100 },
        { field: 'quantity', headerName: 'Quantity', width: 100 },
        { field: 'weight', headerName: 'Weight', width: 100 },
        { field: 'dimensions', headerName: 'Dimensions', width: 100 },
        { field: 'measuringUnit', headerName: 'Measuring Unit', width: 100 },
    ];

    if (source !== 'single') {
        columns.push({ field: 'operations', headerName: 'Operations', width: 280, renderCell: (params) => getRowButtons(params, redirect, editOnClick, deleteOnClick) })
    }
    return columns;
}

export const itemFormColumns = [
    {
        label: "Name",
        type: "string",
        fullWidth: true,
        name: "itemName",
        variant: "filled",
        sx: { gridColumn: "span 2" },
    },
    {
        name: "price",
        label: "Price",
        type: "number",
        fullWidth: true,
        variant: "filled",
        sx: { gridColumn: "span 2" },
    },
    {
        type: "number",
        fullWidth: true,
        name: "quantity",
        label: "Quantity",
        variant: "filled",
        sx: { gridColumn: "span 2" },
    },
    {
        name: "weight",
        label: "Weight",
        type: "string",
        fullWidth: true,
        variant: "filled",
        sx: { gridColumn: "span 2" },
    },
    {
        name: "dimensions",
        label: "Dimensions",
        type: "string",
        fullWidth: true,
        variant: "filled",
        sx: { gridColumn: "span 2" },
    },
    {
        name: "measuringUnit",
        label: "Measuring Unit",
        type: "string",
        fullWidth: true,
        variant: "filled",
        sx: { gridColumn: "span 2" },
    }
]

// Order
export const initialValuesOfOrder = {
    price: "",
    quantity: "",
    customer: "",
    orderItem: "",
    paymentMethod: "",
};

export const checkoutSchemaOfOrder = yup.object().shape({
    price: yup.number().required(),
    quantity: yup.string().required(),
    customer: yup.string().required(),
    orderItem: yup.string().required(),
    paymentMethod: yup.string().required(),
})

export const getOrderColumns = (source, redirect, editOnClick, deleteOnClick) => {
    const columns = [
        { field: 'pk', headerName: 'ID', width: 100 },
        { field: 'customer', headerName: 'Customer', width: 200, valueGetter: (customer) => customer.customerName },
        { field: 'createdDate', headerName: 'Purchase Date', width: 180, valueGetter: (createdDate) =>  format(createdDate, "dd-MM-yyyy hh:mm:ss a")},
        { field: 'paymentMethod', headerName: 'Payment method', width: 120, valueGetter: (paymentMethod) => paymentMethod.name },
        { field: 'operations', headerName: 'Operations', width: 200, renderCell: (params) => getRowButtons(params, redirect, undefined, deleteOnClick) }
    ];

    return columns;
}

export const getOrderFormFields = (items, customers) => {
    return [
        {
            type: "string",
            required: true,
            fullWidth: true,
            variant: "filled",
            name: "customer",
            inputType: "select",
            menuItems: customers,
            label: "Select Customer",
            sx: { gridColumn: "span 2" }
        },
        {
            type: "string",
            required: true,
            fullWidth: true,
            variant: "filled",
            inputType: "select",
            name: "paymentMethod",
            menuItems: paymentMethods,
            sx: { gridColumn: "span 2" },
            label: "Select Payment Method"
        },
        {
            type: "string",
            required: true,
            fullWidth: true,
            menuItems: items,
            name: "orderItem",
            variant: "filled",
            inputType: "select",
            label: "Select item",
            sx: { gridColumn: "span 2" }
        },
        {
            name: "price",
            type: "number",
            required: true,
            fullWidth: true,
            variant: "filled",
            inputType: "input",
            label: "Add Price",
            sx: { gridColumn: "span 2" }
        },
        {
            required: true,
            type: "string",
            name: "quantity",
            fullWidth: true,
            variant: "filled",
            inputType: "input",
            label: "Add Quantity",
            sx: { gridColumn: "span 2" }
        }
    ];
}

export const getEmptyOrder = () => {
    return {
        id: 1,
        price: undefined,
        quantity: undefined,
        customer: undefined,
        orderItem: undefined,
        TotalPrice: undefined,
        paymentMethod: undefined
    }
}

// Customer

export const initialValuesOfCustomer = {
    contact: "",
    address: "",
    customerName: "",
};

export const checkoutSchemaOfCustomer = yup.object().shape({
    contact: yup.number().required("Required"),
    address: yup.string().required("Required"),
    customerName: yup.string().required("Required"),
})

export const getCustomerColumns = (source, redirect, editOnClick, deleteOnClick) => {
    const columns = [
        { field: 'customerName', headerName: 'Name', width: 200 },
        { field: 'contact', headerName: 'Contact', width: 100 },
        { field: 'address', headerName: 'Address', width: 300 },
    ];

    if (source !== 'single') {
        columns.push({ field: 'operations', headerName: 'Operations', width: 300, renderCell: (params) => getRowButtons(params, redirect, editOnClick, deleteOnClick) })
    }
    return columns;
}

export const customerFormColumns = [
    {
        label: "Name",
        type: "string",
        fullWidth: true,
        variant: "filled",
        name: "customerName",
        sx: { gridColumn: "span 2" },
    },
    {
        type: "number",
        name: "contact",
        label: "Contact",
        fullWidth: true,
        variant: "filled",
        sx: { gridColumn: "span 2" },
    },
    {
        type: "string",
        fullWidth: true,
        name: "address",
        label: "Address",
        variant: "filled",
        sx: { gridColumn: "span 4" },
    }
]

// Vendor

export const initialValuesOfVendor = {
    contact: "",
    address: "",
    comapny: "",
    // products: "",
    vendorName: "",
};

export const checkoutSchemaOfVendor = yup.object().shape({
    contact: yup.string().required("Required"),
    comapny: yup.string().required("Required"),
    // products: yup.string().required("Required"),
    address: yup.string().required("Required"),
    vendorName: yup.string().required("Required"),
})

export const getVendorColumns = (source, redirect, editOnClick, deleteOnClick) => {
    const columns = [
        { field: 'vendorName', headerName: 'Name', width: 200 },
        { field: 'contact', headerName: 'contact', width: 100 },
        { field: 'comapny', headerName: 'Comapny', width: 100 },
        { field: 'address', headerName: 'Address', width: 300 },
    ];

    if (source !== 'single') {
        columns.push({ field: 'operations', headerName: 'Operations', width: 300, renderCell: (params) => getRowButtons(params, redirect, editOnClick, deleteOnClick) })
    }
    return columns;
}

export const vendorFormColumns = [
    {
        label: "Name",
        type: "string",
        fullWidth: true,
        variant: "filled",
        name: "vendorName",
        sx: { gridColumn: "span 2" },
    },
    {
        type: "number",
        name: "contact",
        label: "Contact",
        fullWidth: true,
        variant: "filled",
        sx: { gridColumn: "span 2" },
    },
    {
        name: "comapny",
        label: "Comapny",
        type: "string",
        fullWidth: true,
        variant: "filled",
        sx: { gridColumn: "span 2" },
    },
    // {
    //     name: "products",
    //     label: "Products",
    //     type: "string",
    //     fullWidth: true,
    //     variant: "filled",
    //     sx: { gridColumn: "span 2" },
    // },
    {
        type: "string",
        fullWidth: true,
        name: "address",
        label: "Address",
        variant: "filled",
        sx: { gridColumn: "span 2" },
    }
]

// User

export const checkoutSchemaOfUser = yup.object().shape({
    newPassword: yup.string(),
    currentPassword: yup.string(),
    email: yup.string().required("Required")
})

export const userFormColumns = [
    {
        name: "email",
        label: "Email",
        type: "string",
        required: true,
        fullWidth: true,
        variant: "filled",
        sx: { gridColumn: "span 2" },
    },
    {
        required: true,
        fullWidth: true,
        type: "password",
        variant: "filled",
        name: "currentPassword",
        label: "Current password",
        sx: { gridColumn: "span 2" },
    },
    {
        required: true,
        fullWidth: true,
        type: "password",
        variant: "filled",
        name: "newPassword",
        label: "New password",
        sx: { gridColumn: "span 2" },
    }
]

// Buttons

export const addButton = {
    title: "Add",
    type: "submit",
    color: "secondary",
    buttonsource: 'add',
    variant: "contained",
    sx: { gridColumn: "span 4" },
    anchorsx: { color: "black", textDecoration: "none" }
}

export const editButton = {
    title: "Edit",
    type: "submit",
    color: "secondary",
    buttonsource: 'edit',
    variant: "contained",
    style: { marginLeft: 16 },
    sx: { gridColumn: "span 4" }
}

export const viewButton = {
    title: "View",
    type: "button",
    color: "secondary",
    buttonsource: 'view',
    variant: "contained",
    style: { marginLeft: 16 },
    sx: { gridColumn: "span 4" },
    anchorsx: { color: "black", textDecoration: "none" }
}

export const deleteButton = {
    title: "Edit",
    type: "submit",
    color: "secondary",
    buttonsource: 'edit',
    variant: "contained",
    style: { marginLeft: 16 },
    sx: { gridColumn: "span 4" }
}

export const removeButton = {
    title: "Edit",
    type: "submit",
    color: "secondary",
    buttonsource: 'edit',
    variant: "contained",
    sx: { gridColumn: "span 4" }
}

export const backButton = {
    title: "Back",
    type: "button",
    color: "secondary",
    buttonsource: 'back',
    variant: "contained",
    style: { marginLeft: 16 },
    sx: { gridColumn: "span 4" },
    anchorsx: { color: "black", textDecoration: "none" }
}

export const datePickerButton = {
    title: "Pick Date",
    type: "submit",
    color: "secondary",
    buttonsource: 'pickDate',
    variant: "contained",
    sx: { gridColumn: "span 4" },
    anchorsx: { color: "black", textDecoration: "none" }
}

export const getRowButtons = (params, redirect = undefined, editOnClick = undefined, deleteOnClick = undefined) => {

    return (
        <Box>
            {getUserPersmission('edit', 'table') && editOnClick && <Button {...editButton} onClick={() => editOnClick(params)}>Edit</Button>}
            {getUserPersmission('delete', 'table') && deleteOnClick && <Button {...deleteButton} onClick={() => deleteOnClick(params)}>Delete</Button>}
            {redirect && <Button {...viewButton}><Link to={redirect(params)} style={{ ...viewButton.anchorsx }}>View</Link></Button>}
        </Box>
    )
}

export const getRowRemoveButton = (params, deleteOnClick = undefined) => {

    return (
        <Box>
            {deleteOnClick && <Button {...removeButton} onClick={() => deleteOnClick(params)}>Remove</Button>}
        </Box>
    )
}

export const getUserPersmission = (access, flow) => {
    const user = getSessionStorage('user');
    const right = user?.rights;
    let result = false;

    if (flow === 'table') {
        if (access === 'delete') result = right === rights.super || right === rights.admin;
        else if (access === 'edit') result = right === rights.super || right === rights.admin || right === rights.manager;
    }
    else if (flow === 'profile') {
        if (access === 'edit') result = right === rights.super || right === rights.admin;
    }

    return result;
}