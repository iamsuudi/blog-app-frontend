import axios from "axios";
axios.defaults.withCredentials = true;

const baseURL = "http://localhost:3001/api";

export const getBlogs = async () => {
    const response = await axios({
        baseURL,
        method: "get",
        url: "/blogs",
    });
    return response.data;
};

export const createBlog = async () => {
    //
};
