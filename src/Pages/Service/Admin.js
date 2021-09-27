import axios from "axios";

export const suspend = (userID) =>{
    const data = new FormData();
    data.append('userID', userID);

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };
    return axios.post("/admin/users/suspend", data, config)
        .catch((error) => {
            console.log(error);
        });

};

export const enable = (userID) =>{
    const data = new FormData();
    data.append('userID', userID);

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };
    return axios.post("/admin/users/enable", data, config)
        .catch((error) => {
            console.log(error);
        });

};