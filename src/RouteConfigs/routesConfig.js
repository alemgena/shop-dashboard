import React from "react";
import { Redirect } from "react-router-dom";

import {DashboardPageConfig } from "../pages/dashboard/DashboardPageConfig";
import { Error404PageConfig } from "../pages/errors/404/Error404PageConfig";
import { Error500PageConfig } from "../pages/errors/500/Error500PageConfig";
import { ShopPageConfig } from "../pages/shop/ShopPageConfig";
const routeConfigs = [

  
  ...DashboardPageConfig.routes,
  ...ShopPageConfig.routes,
  ...Error404PageConfig.routes,
  ...Error500PageConfig.routes,

  // ...DocumentationConfig.routes
];

const routes = [
  ...routeConfigs,
  {
    component: () => <Redirect to="/pages/errors/error-404" />
  }
  // {
  //   path: "/test",
  //   exact: true,
  //   component: <Example />
  // }
];

export default routes;
