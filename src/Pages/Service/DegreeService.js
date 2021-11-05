import api from "./api";
import {API} from "../Shared/Constants";

export const UploadDegree = async (degree) =>{
    const promise = api.post(API + "/api/Degree/upload", degree);
    return promise.then(() => null).catch(() => Promise.reject());
}

export const UpdateDegree = async (degree) =>{
    const promise = api.post(API + "/api/Degree/update", degree);
    return promise.then(() => null).catch(() => Promise.reject());
}

export const GetDegrees = async (username) =>{
    const promise = api.get(API + "/api/Degree/user/" + username);
    return promise.then((response) => response.data).catch(() => Promise.reject());
}

export const CheckIfDegreeExists = async (degreeID) =>{
    const promise = api.get(API + "/api/Degree/" + degreeID);
    return promise.then((response) => response.data).catch(() => Promise.reject());
}

export const RemoveCourseFromDegree = async (courseID) =>{
    const promise = api.post(API + "/api/Degree/toggle/" + courseID);
    return promise.then(() => null).catch(() => Promise.reject());
}