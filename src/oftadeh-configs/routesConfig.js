import React from "react";
import { Redirect } from "react-router-dom";

import {DashboardPageConfig } from "../pages/dashboard/DashboardPageConfig";
import {RanchMangmentPageConfig} from '../pages/posts/ranchMangment/RanchMangmentPageConfig'


import { LoginPageConfig } from "../pages/auth/login/LoginPageConfig";
import { TruckDriverPageConfig } from "../pages/DelveryAgent/TruckDriverPageConfig";
import { Error404PageConfig } from "../pages/errors/404/Error404PageConfig";
import { Error500PageConfig } from "../pages/errors/500/Error500PageConfig";
import { UserPageConfig } from "../pages/user/UserPageConfig";
import {RigisterConfig} from '../pages/auth/login/RigisterConfig'
// import { DocumentationConfig } from "../pages/documentation/DocumentationConfig";
import {RanchManagerPageConfig} from '../pages/posts/ranchMangment/RanchManagerPageConfig'
import {RanchManagerLoginConfig} from '../pages/auth/ranchManagerLogin/RanchManagerLoginConfig'
import{LiveStockSupplierConfig} from '../pages/LiveStockSuppiler/LiveStockSuplierConfig'
import {LiveStockPageConfig} from '../pages/LiveStock/LiveStockPageConfig'
import{RanchSupplayPageConfig} from '../pages/RanchSupplay/RanchSupplayPageConfig'
import { DeliveryAgentPageConfig } from "../pages/DelveryAgent/DeliveryAgentPageConfig";
import { TruckPageConfig } from "../pages/DelveryAgent/TruckPageConfig";
import { RequestPageConfig } from "../pages/manageRequest/RequestPageConfig";
import {RanchManagerRequestPageConfig} from '../pages/RanchManagerRequest/requestPageConfig'
const routeConfigs = [
  ...TruckDriverPageConfig.routes,
  ...RanchManagerRequestPageConfig.routes,
  ...TruckPageConfig.routes,
  ...RanchSupplayPageConfig.routes,
  ...RanchManagerPageConfig.routes,
...RigisterConfig.routes,
...RequestPageConfig.routes,
...DeliveryAgentPageConfig.routes,
  ...DashboardPageConfig.routes,
  ...UserPageConfig.routes,
  ...LiveStockPageConfig.routes,
  ...LiveStockSupplierConfig.routes,
...RanchManagerLoginConfig.routes,
  ...RanchMangmentPageConfig.routes,
  ...LoginPageConfig.routes,
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
