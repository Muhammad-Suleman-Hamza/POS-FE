import * as yup from 'yup';
import { Box } from '@mui/material';
import { paymentMethods } from './generic';
import Button from '@mui/material/Button';

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
    weight: "",
    customer: "",
    orderItem: "",
    paymentMethod: "",
};

export const checkoutSchemaOfOrder = yup.object().shape({
    price: yup.number().required(),
    weight: yup.string().required(),
    customer: yup.string().required(),
    orderItem: yup.string().required(),
    paymentMethod: yup.string().required(),
})

export const getOrderColumns = (editOnClick, deleteOnClick) => {
    return [
        { field: 'orderItemName', headerName: 'Item', width: 200 },
        { field: 'price', headerName: 'Price', width: 200 },
        { field: 'weight', headerName: 'Weight', width: 200 },
        { field: 'customerName', headerName: 'Customer', width: 200 },
        { field: 'paymentMethodName', headerName: 'Payment method', width: 200 },
        {
            field: 'operations', headerName: 'Operations', width: 200, renderCell: (params) => (
                <Box>
                    <Button {...editButton} onClick={() => editOnClick(params)}>Edit</Button>
                    <Button {...editButton} onClick={() => deleteOnClick(params)}>Delete</Button>
                </Box>
            )
        },
    ];
}

export const getOrderFormFields = (items, customers) => {
    return [
        {
            type: "string",
            required: true,
            fullWidth: true,
            menuItems: items,
            name: "orderItem",
            variant: "filled",
            inputType: "select",
            label: "Select Item",
            sx: { gridColumn: "span 2" }
        },
        {
            name: "price",
            label: "Price",
            type: "number",
            required: true,
            fullWidth: true,
            variant: "filled",
            inputType: "input",
            sx: { gridColumn: "span 2" }
        },
        {
            name: "weight",
            label: "Weight",
            required: true,
            type: "string",
            fullWidth: true,
            variant: "filled",
            inputType: "input",
            sx: { gridColumn: "span 2" }
        },
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
        }
    ];
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

// Customer

export const initialValuesOfProfile = {
    DB: "",
    email: "",
    password: "",
};

export const checkoutSchemaOfProfile = yup.object().shape({
    contact: yup.number().required("Required"),
    address: yup.string().required("Required"),
    customerName: yup.string().required("Required"),
})

export const customerFormProfile = [
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