import React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "../../RouteConfigs/routesConfig";

const OftadehRoutes = () => {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </Switch>
  );
};

export default OftadehRoutes;
