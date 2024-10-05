import * as yup from 'yup';

// Item
export const initialValuesOfItem = {
    name: "",
    price: "",
    weight: "",
    dimensions: "",
    measuringUnit: "",
};

export const checkoutSchemaOfItem = yup.object().shape({
    name: yup.string().required("Required"),
    price: yup.number().required("Required"),
    weight: yup.string().required("Required"),
    dimensions: yup.string().required("Required"),
    measuringUnit: yup.string().required("Required"),
})

export const itemFormColumns = [
    {
        name: "name",
        label: "Name",
        type: "string",
        fullWidth: true,
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
    name: "",
    price: "",
    weight: "",
    customer: "",
    paymentMethod: "",
};

export const checkoutSchemaOfOrder = yup.object().shape({
    name: yup.string().required("Required"),
    price: yup.number().required("Required"),
    weight: yup.string().required("Required"),
    customer: yup.string().required("Required"),
    paymentMethod: yup.string().required("Required"),
})

export const orderFormColumns = [
    {
        name: "name",
        label: "Name",
        type: "string",
        fullWidth: true,
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
        name: "customer",
        label: "Customer",
        type: "string",
        fullWidth: true,
        variant: "filled",
        sx: { gridColumn: "span 2" },
    },
    {
        name: "paymentMethod",
        label: "Payment Method",
        type: "string",
        fullWidth: true,
        variant: "filled",
        sx: { gridColumn: "span 2" },
    }
]

// Customer

export const initialValuesOfCustomer = {
    name: "",
    number: "",
};

export const checkoutSchemaOfCustomer = yup.object().shape({
    name: yup.string().required("Required"),
    number: yup.string().required("Required"),
})

export const customerFormColumns = [
    {
        name: "name",
        label: "Name",
        type: "string",
        fullWidth: true,
        variant: "filled",
        sx: { gridColumn: "span 2" },
    },
    {
        type: "phone",
        name: "number",
        label: "Number",
        fullWidth: true,
        variant: "filled",
        sx: { gridColumn: "span 2" },
    }
]

// Vendor

export const initialValuesOfVendor = {
    name: "",
    number: "",
    comapny: "",
    products: "",
    location: "",
};

export const checkoutSchemaOfVendor = yup.object().shape({
    name: yup.string().required("Required"),
    number: yup.string().required("Required"),
    comapny: yup.string().required("Required"),
    products: yup.string().required("Required"),
    location: yup.string().required("Required"),
})

export const vendorFormColumns = [
    {
        name: "name",
        label: "Name",
        type: "string",
        fullWidth: true,
        variant: "filled",
        sx: { gridColumn: "span 2" },
    },
    {
        name: "number",
        label: "Number",
        type: "number",
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
    {
        name: "products",
        label: "Products",
        type: "string",
        fullWidth: true,
        variant: "filled",
        sx: { gridColumn: "span 2" },
    },
    {
        name: "location",
        label: "Location",
        type: "string",
        fullWidth: true,
        variant: "filled",
        sx: { gridColumn: "span 2" },
    }
]

export const addButton = {
    title: "Add",
    type: "submit",
    color: "secondary",
    variant: "contained",
    sx: { gridColumn: "span 4" },
}

export const editButton = {
    title: "Edit",
    type: "button",
    color: "secondary",
    variant: "contained",
    style: { marginLeft: 16 },
    sx: { gridColumn: "span 4" }
}