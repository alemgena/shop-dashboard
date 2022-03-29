// import { MaterialUIComponentsNavigation } from "../pages/documentation/material-ui-components/MaterialUIComponentsNavigation";
import PersonIcon from '@mui/icons-material/Person';
import React from 'react'
import AgricultureIcon from '@mui/icons-material/Agriculture';
const navigationConfig = [
  {
    id: "Main",
    title: "MAIN",
    type: "group",
    children: [
      {
        id: "dashboard",
        title: "Dashboard",
        type: "item",
        icon: "apps",
        url: "/",
        exact: true,
      },
      {
       id: "user",
        title: "User",
        type: "item",
        icon: <PersonIcon/>,
        url: "/user",
        exact: true,
      },
      
      {
        id: "main rance",
        title: "Manage Ranch",
        type: "collapse",
        icon: <AgricultureIcon/>,
       
        children: [
          {
            id: "ranch",
            title: "Ranch Manager",
            type: "item",
            url: "/ranchManager",
            exact: true,
          },
          {
            id: "ranch manager",
            title: "Ranch",
            type: "item",
            url: "/ranchmangment",
            exact: true,
          },
        ],
      },
       {
        id: "main deliveryAgent",
        title: "Manage Delivery Agent",
        type: "collapse",
        icon: <AgricultureIcon/>,
        children: [
          {
            id: "deliveryAgent",
            title: "Delivery Agent",
            type: "item",
            url: "/deliveryAgent",
            exact: true,
          },
          {
            id: "delivery track",
            title: " Manage Truck",
            type: "item",
            url: "/deliveryTruck",
            exact: true,
          },
             {
            id: "driver",
            title: "Truck Driver",
            type: "item",
            url: "/truckDriver",
            exact: true,
          },
        ],
      },
  {
        id: "main liveStock",
        title: "Manage LiveStock",
        type: "collapse",
        icon: <AgricultureIcon/>,
       
        children: [
          {
            id: "liveStock supplier",
            title: "LiveStock Supplier",
            type: "item",
            url: "/liveStockSuppplier",
            exact: true,
          },
          {
            id: "Livestock management",
            title: "Livestock",
            type: "item",
            url: "/livestockmangment",
            exact: true,
          },
        ],
      },
           {
       id: "request",
        title: "Manage Request",
        type: "item",
        icon: <PersonIcon/>,
        url: "/request",
        exact: true,
      },``
    ],
  },
  {
    id: "divider-1",
    type: "divider",
  },
];

export default navigationConfig;
