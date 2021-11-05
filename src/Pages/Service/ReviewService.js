import api from "./api";
import {API} from "../Shared/Constants";

export const AddReview = async (review) =>{
    const promise = api.post(API + "/api/Review/write", review);
    return promise.then(() => null).catch(() => Promise.reject());
}

export const DeleteReview = async (courseID) =>{
    const promise = api.post(API + "/api/Review/delete/" + courseID);
    return promise.then(() => null).catch(() => Promise.reject());
}

export const GetReview = async (courseID) =>{
    const promise = api.get(API + "/api/Review/" + courseID);
    return promise.then((response) => response).catch(() => Promise.reject());
}