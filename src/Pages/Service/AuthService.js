import axios from "axios";
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


export const logout = async () => {
    console.log("Logged out!");

    return await axios.post("/logout").then(response => {
        console.log(response);
        localStorage.clear();
    });
}