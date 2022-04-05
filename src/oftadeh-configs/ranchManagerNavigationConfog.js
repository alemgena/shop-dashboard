// import { MaterialUIComponentsNavigation } from "../pages/documentation/material-ui-components/MaterialUIComponentsNavigation";
import PersonIcon from '@mui/icons-material/Person';
import React from 'react'
import AgricultureIcon from '@mui/icons-material/Agriculture';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
const navigationConfig = [
  {
    id: "Main",
    title: "MAIN",
    type: "group",
    children: [
      {
        id: "LiveStock manage",
        title: "Manage LiveStock",
        type: "collapse",
        icon: <FormatAlignLeftIcon/>,
       
        children: [
          {
            id: "liveStock supplier",
            title: "LiveStock Supplier",
            type: "item",
            url: "/liveStockSuppplier",
            exact: true,
          },
          {
            id: " livestock",
            title: "LiveceStock",
            type: "item",
            url: "/liveStock",
            exact: true,
          },
        ],
      },
      {
        id: "ranch supplay",
        title: "Ranch Supplay",
        type: "item",
        icon:<FormatAlignLeftIcon/>,
        url: "/ranchSupplay",
        exact: true,
      },
          {
        id: "request",
        title: "Manage Request",
        type: "item",
        icon: <FormatAlignLeftIcon/>,
        url: "/manageRequest",
        exact: true,
      },

       {
        id: "main deliveryAgent",
        title: "Manage Delivery Agent",
        type: "collapse",
        icon: <FormatAlignLeftIcon/>,
        children: [
          {
            id: "deliveryAgent",
            title: "Delivery Agent",
            type: "item",
            url: "/delivery",
            exact: true,
          },
          {
            id: "delivery track",
            title: " Manage Truck",
            type: "item",
            url: "/truck",
            exact: true,
          },
             {
            id: "driver",
            title: "Truck Driver",
            type: "item",
            url: "/driver",
            exact: true,
          },
        ],
      },
          {
        id: "nearbytruck",
        title: "Nearby Trucks",
        type: "item",
        icon: <FormatAlignLeftIcon/>,
        url: "/nerbytrucks",
        exact: true,
      },
    ],
  },
  {
    id: "divider-1",
    type: "divider",
  },
];

export default navigationConfig;
