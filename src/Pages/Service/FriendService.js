import api from "./api";
import {API} from "../Shared/Constants";

export const SendRequest = async (otherId) => {
    const promise = api.post(API + "/api/Friends/request/" + otherId);
    return promise.then(() => null).catch(() => Promise.reject());
}

export const CancelSentRequest = async (otherId) => {
    const promise = api.post(API + "/api/Friends/cancel/" + otherId);
    return promise.then(() => null).catch(() => Promise.reject());
}

export const AcceptReceivedRequest = async (otherId) => {
    const promise = api.post(API + "/api/Friends/accept/" + otherId);
    return promise.then(() => null).catch(() => Promise.reject());
}

export const UnFriend = async (otherId) => {
    const promise = api.post(API + "/api/Friends/unfriend/" + otherId);
    return promise.then(() => null).catch(() => Promise.reject());
}

export const GetFriends = async (userId) => {
    const promise = api.get(API + "/api/Friends/friends/" + userId);
    return promise.then((response) => response.data).catch(() => Promise.reject());
}

export const GetPendingSent = async () => {
    const promise = api.get(API + "/api/Friends/pending/sent");
    return promise.then((response) => response.data).catch(() => Promise.reject());
}

export const GetPendingReceived = async () =>{
    const promise = api.get(API + "/api/Friends/pending/received");
    return promise.then((response) => response.data).catch(() => Promise.reject());
}