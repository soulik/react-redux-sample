import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {Pages} from "./containers/Menu";
import {DynamicComponent} from "./utils/DynamicComponent"
import React from "react";

export const AppRouter = () => {
    return (
        <Router>
            <Switch>
                {Pages.map((item) => (
                    <Route key={item.path} path={item.path} exact={item.exactPath}>
                        <DynamicComponent component={item.component}/>
                    </Route>
                ))}
            </Switch>
        </Router>
    )
}