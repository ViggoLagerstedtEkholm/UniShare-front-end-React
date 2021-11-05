import api from "./api";
import {API} from "../Shared/Constants";

export const GetStatistics = async () => {
    const promise = api.get(API + "/api/Home/statistics");
    return promise.then((response) => response.data).catch(() => Promise.reject());
}

