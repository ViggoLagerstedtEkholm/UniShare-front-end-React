import api from "./api";
import {API} from "../Shared/Constants";
import axios from "axios";

export const LogIn = (credentials) =>{
    const promise = api.post(API + "/api/Authentication/Login", credentials);
    return promise.then(response => response).catch(() => Promise.reject("Could not login!"));
}

export const RegisterAccount = (credentials) =>{
    const promise = axios.post(API + "/api/Authentication/Register", credentials);
    return promise.then(() => null).catch((error) => Promise.reject(error.response.data));
}

export const VerifyEmail = (credentials) =>{
    const promise = axios.post(API + "/api/Authentication/Verify", credentials);
    return promise.then(() => null).catch((error) => Promise.reject(error.response.data));
}

export const DeleteUser = () =>{
    const promise = api.post(API + "/api/Authentication/Delete/Account");
    return promise.then(() => null).catch((error) => Promise.reject(error.response.data));
}