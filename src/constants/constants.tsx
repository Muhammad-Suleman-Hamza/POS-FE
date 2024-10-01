
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

export const pages = {
    "mainMenu": [
        {
            "route": "",
            "title": "Home",
            "icon": <HomeOutlinedIcon />
        },
        {
            "title": "Items",
            "route": "items",
            "icon": <HomeOutlinedIcon />
        },
        {
            "title": "Orders",
            "route": "orders",
            "icon": <ReceiptOutlinedIcon />
        },
        {
            "title": "Customers",
            "route": "customers",
            "icon": <PeopleOutlinedIcon />
        },
        {
            "title": "Vendors",
            "route": "vendors",
            "icon": <PeopleOutlinedIcon />
        },
        {
            "title": "Reports",
            "route": "reports",
            "icon": <BarChartOutlinedIcon />
        }
    ],
    "settings": [
        {
            "title": "Profile",
            "route": "profile",
            "icon": <PersonOutlinedIcon />
        },
        {
            "title": "Configurations",
            "route": "configurations",
            "icon": <HelpOutlineOutlinedIcon />
        },
        {
            "title": "Logout",
            "route": "logout",
            "icon": <CloseOutlinedIcon />
        }
    ]
}

export const itemColumns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'price', headerName: 'Price', width: 200 },
    { field: 'weight', headerName: 'Weight', width: 200 },
    { field: 'dimensions', headerName: 'Dimensions', width: 200 },
    { field: 'measuringUnit', headerName: 'Measuring Unit', width: 200 }
];

export const orderColumns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'price', headerName: 'Price', width: 200 },
    { field: 'weight', headerName: 'Weight', width: 200 },
    { field: 'customer', headerName: 'Customer', width: 200 },
    { field: 'paymentMethod', headerName: 'Payment method', width: 200 }
];

export const customerColumns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'number', headerName: 'Number', width: 200 },
];

export const vendorColumns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'number', headerName: 'Number', width: 200 },
    { field: 'comapny', headerName: 'Comapny', width: 200 },
    { field: 'products', headerName: 'Products', width: 200 },
    { field: 'location', headerName: 'Location', width: 200 },
];

export const reportColumns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'price', headerName: 'Price', width: 200 },
    { field: 'weight', headerName: 'Weight', width: 200 },
    { field: 'dimensions', headerName: 'Dimensions', width: 200 },
    { field: 'measuringUnit', headerName: 'Measuring Unit', width: 200 }
];