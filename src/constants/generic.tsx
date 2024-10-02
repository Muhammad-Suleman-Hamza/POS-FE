
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

export const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;