import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

export const pages = {
    "mainMenu": [
        {
            "route": "dashboard",
            "title": "Home",
            "icon": <HomeOutlinedIcon />
        },
        {
            "title": "Items",
            "route": "items",
            "icon": <ReceiptOutlinedIcon />
        },
        {
            "title": "Orders",
            "route": "orders",
            "icon": <PointOfSaleIcon />
        },
        {
            "title": "Customers",
            "route": "customers",
            "icon": <PersonAddIcon />
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
        // {
        //     "title": "Configurations",
        //     "route": "configurations",
        //     "icon": <HelpOutlineOutlinedIcon />
        // },
        {
            "title": "Logout",
            "route": "logout",
            "icon": <CloseOutlinedIcon />
        }
    ]
}

export const paymentMethods = [
    {
        pk: "COD",
        name: "Cash on Delivery",
    },
    {
        pk: "CashCheque",
        name: "Cash Cheque",
    },
    {
        pk: "CrossCheque",
        name: "Cross Cheque",
    },
    {
        pk: "Installments",
        name: "Installments",
    },
    {
        pk: "Others",
        name: "Others",
    },
]

export const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;