import * as yup from 'yup';

// Items 
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

export const inputsFieldsOfItem = [
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

export const addbuttonOfItem = {
    type: "submit",
    color: "secondary",
    variant: "contained",
    title: "Create New Item",
    sx: { gridColumn: "span 2" }
}