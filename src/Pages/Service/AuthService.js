import axios from "axios";
import React from "react";
import {API} from "../Shared/Constants";

const register = (email, username, password) => {
    return axios.post(API + "/register", {
        username,
        email,
        password
    });
}

export const login = (email, password, rememberMe, setUser) => {
    const data = new URLSearchParams();
    data.append('email', email);
    data.append('password', password);
    data.append('rememberMe', rememberMe);

    const options = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        withCredentials: true
    }

    return axios.post(API + "/login", data, options).then(response => {
        localStorage.clear();
        localStorage.setItem('USER', JSON.stringify(response['data']));
        setUser(JSON.stringify(response['data']));
        window.location.reload();
    })
    .catch((error) => {
        console.log(error);
    });
};


export const logout = async () => {
    console.log("Logged out!");

    return await axios.post(API + "/logout", null, {withCredentials: true}).then(response => {
        console.log(response);
        localStorage.clear();
    });
}