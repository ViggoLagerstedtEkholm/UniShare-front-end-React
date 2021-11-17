import axios from "axios";
import {API} from "../Shared/Constants";

const instance = axios.create({
    baseURL: API,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        if(localStorage.getItem('token')){
            const data = JSON.parse(localStorage.getItem('token') ?? null);
            const AuthToken = data.token;

            if (AuthToken) {
                config.headers["Authorization"] = 'Bearer ' + AuthToken; //Attach token to header.
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use((res) => {return res;},
    async (err) => {

        const originalConfig = err.config;

        const token = JSON.parse(localStorage.getItem('token'));

        const AuthToken = token.token;
        const RefreshToken = token.refreshToken;

        if (originalConfig.url !== "/api/Authentication/login" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const response = await instance.post("/api/Authentication/RefreshToken", {token: AuthToken, refreshToken: RefreshToken});
                    localStorage.clear();
                    localStorage.setItem('token', JSON.stringify(response.data));
                    return instance(originalConfig);
                } catch (_error) {
                    localStorage.clear();
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);

export default instance;