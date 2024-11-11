import * as yup from 'yup';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { paymentMethods } from './generic';

// Item
export const initialValuesOfItem = {
    price: "",
    weight: "",
    itemName: "",
    dimensions: "",
    measuringUnit: "",
};

export const checkoutSchemaOfItem = yup.object().shape({
    price: yup.number().required("Required"),
    weight: yup.string().required("Required"),
    itemName: yup.string().required("Required"),
    dimensions: yup.string().required("Required"),
    measuringUnit: yup.string().required("Required"),
})

export const getItemColumns = (source = '', redirect, editOnClick, deleteOnClick) => {
    const columns = [
        { field: 'pk', headerName: 'ID', width: 200 },
        { field: 'itemName', headerName: 'Name', width: 200 },
        { field: 'price', headerName: 'Price', width: 200 },
        { field: 'weight', headerName: 'Weight', width: 200 },
        { field: 'dimensions', headerName: 'Dimensions', width: 200 },
        { field: 'measuringUnit', headerName: 'Measuring Unit', width: 200 },
    ];

    if (source !== 'single') {
        columns.push({ field: 'operations', headerName: 'Operations', width: 300, renderCell: (params) => getRowButtons(params, redirect, editOnClick, deleteOnClick) })
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
        { field: 'pk', headerName: 'ID', width: 200 },
        { field: 'customer', headerName: 'Customer', width: 200, valueGetter: (customer) => customer.customerName },
        { field: 'createdDate', headerName: 'Purchase Date', width: 200 },
        { field: 'paymentMethod', headerName: 'Payment method', width: 200, valueGetter: (paymentMethod) => paymentMethod.name },
        { field: 'operations', headerName: 'Operations', width: 300, renderCell: (params) => getRowButtons(params, redirect, undefined, deleteOnClick) }
    ];

    return columns;
}

export const getSingleOrderColumns = (source, redirect, editOnClick, deleteOnClick) => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'orderItem', headerName: 'Item', width: 200 },
        { field: 'price', headerName: 'Price', width: 200 },
        { field: 'quantity', headerName: 'Quantity', width: 200 },
        { field: 'customerName', headerName: 'Customer', width: 200 },
        { field: 'createdDate', headerName: 'Purchase Date', width: 200 },
        { field: 'paymentMethodName', headerName: 'Payment method', width: 200 },
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
        { field: 'contact', headerName: 'Contact', width: 200 },
        { field: 'address', headerName: 'Address', width: 200 },
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
        { field: 'contact', headerName: 'contact', width: 200 },
        { field: 'comapny', headerName: 'Comapny', width: 200 },
        { field: 'address', headerName: 'Address', width: 200 },
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
        fullWidth: true,
        variant: "filled",
        sx: { gridColumn: "span 2" },
    },
    {
        fullWidth: true,
        type: "password",
        variant: "filled",
        name: "currentPassword",
        label: "Current password",
        sx: { gridColumn: "span 2" },
    },
    {
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

export const getRowButtons = (params, redirect = undefined, editOnClick = undefined, deleteOnClick = undefined) => {
    return (
        <Box>
            {editOnClick && <Button {...editButton} onClick={() => editOnClick(params)}>Edit</Button>}
            {deleteOnClick && <Button {...deleteButton} onClick={() => deleteOnClick(params)}>Delete</Button>}
            {redirect && <Button {...viewButton}><Link to={redirect(params)} style={{ ...viewButton.anchorsx }}>View</Link></Button>}
        </Box>
    )
}