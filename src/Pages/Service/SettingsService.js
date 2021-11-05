import {API} from "../Shared/Constants";
import api from "./api";

export const GetAccountSettings = () => {
    const promise = api.get(API + "/api/Settings/account");
    return promise.then((response) => response.data).catch(() => Promise.reject());
}

export const UpdateAccount = (account) => {
    const promise = api.post(API + "/api/Settings/account/update", account);
    return promise.then(() => null).catch(() => Promise.reject());
}

export const GetHandles = () => {
    const promise = api.get(API + "/api/Settings/handles");
    return promise.then((response) => response.data).catch(() => Promise.reject());
}

export const UpdateHandles = (handles) => {
    const promise = api.post(API + "/api/Settings/handles/update", handles);
    return promise.catch(() => Promise.reject());
}

export const DeleteLinkedIn = () => {
    const promise = api.post(API + "/api/Settings/handles/delete/linkedin");
    return promise.catch(() => Promise.reject());
}

export const DeleteGithub = () => {
    const promise = api.post(API + "/api/Settings/handles/delete/github");
    return promise.catch(() => Promise.reject());
}