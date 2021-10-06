import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {RingLoader} from "react-spinners";

export const NotFound = () => {
    let color = useState("#b1deec");

    return(
        <div className="container">
            <h1>404 - Not Found!</h1>
            <Link to="/">
                Go Home
            </Link>
            <div className="not-found-animation">
                <RingLoader  color={color} loading={true} size={50} margin={2}/>
            </div>
        </div>
    )
}
export default NotFound;