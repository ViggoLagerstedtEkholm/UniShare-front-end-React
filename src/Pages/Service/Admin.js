import axios from "axios";
import {API} from "../Shared/Constants";

export const suspend = (userID) => {
    const data = new FormData();
    data.append('userID', userID);

    return axios.post(API + "/admin/users/suspend", data, {withCredentials: true})
        .catch((error) => {
            console.log(error);
        });

};

export const enable = (userID) => {
    const data = new FormData();
    data.append('userID', userID);

    return axios.post(API + "/admin/users/enable", data, {withCredentials: true})
        .catch((error) => {
            console.log(error);
        });

};