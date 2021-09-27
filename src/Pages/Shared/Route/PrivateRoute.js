import {Redirect, Route} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../Context/UserContext";

export function PrivateRoute ({component: Component, ...rest}) {
    const {user} = useContext(UserContext);

    if(user === null){
        return <Redirect to="/login" />
    }

    return (
        <Route
            {...rest}
            render={(props) =>  user['privilege'] === "Admin" ? <Component {...props} /> : <Redirect to="/" /> }
        />
    )
}