import axios from "axios";
axios.defaults.withCredentials = true;

const baseURL = "http://localhost:3001/api";

export const getUser = async () => {
    const response = await axios({
        method: "get",
        baseURL,
        url: "/auth/status",
    });
    console.log(response.data);
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
