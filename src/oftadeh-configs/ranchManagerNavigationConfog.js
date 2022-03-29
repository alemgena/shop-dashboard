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
        id: "LiveStock manage",
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
        icon: "event",
        url: "/ranchSupplay",
        exact: true,
      },
          {
        id: "request",
        title: "Manage Request",
        type: "item",
        icon: "event",
        url: "/manageRequest",
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
