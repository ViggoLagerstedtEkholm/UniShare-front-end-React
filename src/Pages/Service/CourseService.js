import axios from "axios";
import {API} from "../Shared/Constants";

export const checkIfCourseExists = async (courseID) => {
    const promise =  axios.get(API + "/course/get", {
        params: {
            courseID: courseID
        }
    });

    return promise.then((response) => response.data).catch(() => null);
}
