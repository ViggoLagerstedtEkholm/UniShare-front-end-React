import axios from "axios";
import React from "react";
import {API} from "../Shared/Constants";

export const logout = async () => {
    console.log("Logged out!");

    return await axios.post(API + "/logout", null, {withCredentials: true}).then(response => {
        console.log(response);
        localStorage.clear();
    }).catch(error =>{
        console.log(error);
    });
}