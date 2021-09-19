import axios from "axios";
import {Redirect} from "react-router-dom";
import React from "react";

const register = (email, username, password) =>{
    return axios.post("/register", {
        username,
        email,
        password
    });
}

export const login = (email, password, rememberMe) =>{
    const data = new URLSearchParams();
    data.append('email', email);
    data.append('password', password);
    data.append('rememberMe', rememberMe);

    const options = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        withCredentials: true
    }

    return axios.post("/login", data, options)
        .catch((error) => {
        console.log(error);
    });

};


export const logout = () => {
    console.log("Logged out!");

    axios.post("/logout").then(() =>{
        localStorage.clear();
    })
    .catch((error) => {
        console.log(error);
    });

    return <Redirect to="/" />;
}