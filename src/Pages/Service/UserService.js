import axios from "axios";
import {API} from "../Shared/Constants";
import api from "./api";

export const FetchUser = async (username) => {
    const promise =  axios.get(API + "/api/user/" + username);
    return promise.then((response) => response.data).catch(() => Promise.reject());
}

export const FetchProfile = async (username) => {
    const promise = axios.get(API + "/api/Profile/" + username);
    return promise.then((response) => response.data).catch(() => Promise.reject());
}

export const FetchImage = async username => {
    const promise = axios.get(API + "/api/Profile/image/get/" + username);
    return promise.then((response) => response).catch(() => Promise.reject());
}

export const UploadImage = async image =>{
    const promise = api.post(API + "/api/Profile/image/upload", image,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    return promise.then((response) => response).catch(() => Promise.reject());
}

export const AppendVisit = async (profileID) => {
    const promise = axios.post(API + "/api/Profile/append/" + profileID);
    return promise.then(() => null).catch(() => Promise.reject());
}

export const CanSeeEdits = (currentPageUsername, user) =>{
    let canSeeProfileEdits = false;
    if (user !== null) {
        const currentLoggedIn = user.Username;
        if (currentLoggedIn === currentPageUsername) {
            canSeeProfileEdits = true;
        }
    }
    return canSeeProfileEdits;
}