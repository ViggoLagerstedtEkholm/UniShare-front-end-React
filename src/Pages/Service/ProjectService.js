import api from "./api";
import {API} from "../Shared/Constants";

export const AddProject = async (project) =>{
    const promise = api.post(API + "/api/Project/upload", project);
    return promise.then((response) => response.data).catch(() => Promise.reject());
}

export const UpdateProject = async (project) =>{
    const promise = api.post(API + "/api/Project/update", project);
    return promise.then((response) => response.data).catch(() => Promise.reject());
}

export const GetProjects = async (profileID) =>{
    const promise = api.get(API + "/api/Project/user/" + profileID);
    return promise.then((response) => response.data).catch(() => Promise.reject());
}

export const DeleteProject = async (projectID) =>{
    const promise = api.post(API + "/api/Project/delete/" + projectID);
    return promise.then((response) => response.data).catch(() => Promise.reject());
}

export const CheckIfProjectExists = async (projectID) =>{
    const promise = api.get(API + "/api/Project/" + projectID);
    return promise.then((response) => response).catch(() => Promise.reject());
}