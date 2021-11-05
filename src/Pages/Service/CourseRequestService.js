import api from "./api";
import {API} from "../Shared/Constants";

export const UploadRequest = async (request) => {
    const promise = api.post(API + "/api/Request/upload", request);
    return promise.then(() => null).catch(() => Promise.reject());
}

export const UpdateRequest = async (request) => {
    const promise = api.post(API + "/api/Request/upload", request);
    return promise.then(() => null).catch(() => Promise.reject());
}

export const GetRequests = async () => {
    const promise = api.get(API + "/api/Request/all");
    return promise.then((response) => response.data).catch(() => Promise.reject());
}

export const DeleteRequest = async (requestId) => {
    const promise = api.post(API + "/api/Request/delete/" + requestId);
    return promise.then(() => null).catch(() => Promise.reject());
}

export const ApproveRequest = async (requestId) => {
    const promise = api.post(API + "/api/Request/approve/" + requestId);
    return promise.then(() => null).catch(() => Promise.reject());
}

export const DenyRequest = async (requestId) => {
    const promise = api.post(API + "/api/Request/deny/" + requestId);
    return promise.then(() => null).catch(() => Promise.reject());
}
