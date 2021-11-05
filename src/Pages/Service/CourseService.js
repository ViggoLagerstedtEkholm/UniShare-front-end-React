import axios from "axios";
import {API} from "../Shared/Constants";
import api from "./api";

export const CheckIfCourseExists = (courseID) => {
    const promise = axios.get(API + "/api/Course/" + courseID);
    return promise.then((response) => response.data).catch(() => Promise.reject());
}

export const UpdateCourse = (request) =>{
    const promise = api.post(API + "/api/Course/update", request);
    return promise.catch(error => Promise.reject(error));
}

export const GetStatistics = async (courseID) =>{
    const promise = api.get(API + "/api/Course/statistics/" + courseID);
    return promise.then((response) => response.data).catch(() => Promise.reject());
}

export const GetGraphData = (courseID) =>{
    const promise = api.get(API + "/api/Course/graph/" + courseID);
    return promise.then((response) => response.data).catch(() => Promise.reject());
}

export const SetRating = async (courseID, rating) =>{
    const promise = api.post(API + "/api/Course/set/rating", {Id : courseID, Score : rating});
    return promise.then((response) => response.data).catch(() => Promise.reject());
}

export const GetRating = async (courseID) =>{
    const promise = api.get(API + "/api/Course/get/rating/" + courseID);
    return promise.then((response) => response.data).catch(() => Promise.reject());
}

export const ToggleCourseToDegree = async (courseID) =>{
    const promise = api.post(API + "/api/Degree/toggle/" + courseID);
    return promise.then((response) => response.data).catch(() => Promise.reject());
}