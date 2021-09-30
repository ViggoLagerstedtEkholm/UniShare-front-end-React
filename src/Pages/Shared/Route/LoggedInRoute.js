import {Redirect, Route} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../Context/UserContext";

export function LoggedInRoute ({component: Component, ...rest}) {
    const {user} = useContext(UserContext);

    if(user === null){
        return <Redirect to="/login" />
    }

    return (
        <Route
            {...rest}
            render={(props) => <Component {...props} />}
        />
    )
}