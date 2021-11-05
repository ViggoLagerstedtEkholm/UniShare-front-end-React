import api from "./api";
import {API} from "../Shared/Constants";

export const DeleteComment = (commentID) =>{
    const promise = api.post(API + "/api/Comment/delete/" + commentID);
    return promise.then((response) => response.data).catch(() => Promise.reject());
}

export const CreateComment = (comment) =>{
    const promise = api.post(API + "/api/Comment/write", comment);
    return promise.then(() => null).catch(() => Promise.reject());
}