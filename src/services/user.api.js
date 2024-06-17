import axios from "axios";
axios.defaults.withCredentials = true;

export const getUser = async () => {
    const response = await axios({
        method: "get",
        baseURL: "http://localhost:3001/api",
        url: "/auth/status",
    });
    console.log(response.data);
    return response.data;
};

export const logout = async () => {
    const response = await axios({
        method: "post",
        baseURL: "http://localhost:3001/api",
        url: "/auth/logout",
    });
    return response.data;
};
