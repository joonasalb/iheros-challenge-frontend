import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Threats from "../pages/Threats";

export default function Routes() {
    return (
        <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/dashboard' isPrivate component={Dashboard} />
            <Route path='/threats' isPrivate component={Threats} />
            <Route path='/' component={() => <h1>404</h1>} />
        </Switch>
    );
}
