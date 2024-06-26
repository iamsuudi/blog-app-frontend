import axios from "axios";
axios.defaults.withCredentials = true;

const baseURL = "http://localhost:3001/api";

export const getMe = async () => {
    const response = await axios({
        method: "get",
        baseURL,
        url: "/auth/status",
    });
    return response.data;
};

export const logout = async () => {
    const response = await axios({
        method: "post",
        baseURL,
        url: "/auth/logout",
    });
    return response.data;
};

export const login = async (data) => {
    const response = await axios({
        method: "post",
        baseURL,
        url: "/auth/signin",
        data,
    });
    return response.data;
};

export const signup = async (data) => {
    const response = await axios({
        method: "post",
        baseURL,
        url: "/auth/signup",
        data,
    });
    return response.data;
};

export const updateMe = async (data) => {
    const response = await axios({
        method: "put",
        baseURL,
        url: "/users/me",
        data,
    });
    return response.data;
};
