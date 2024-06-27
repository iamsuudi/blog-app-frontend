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

export const createBlog = async (data) => {
    const response = await axios({
        baseURL,
        method: "post",
        url: "/blogs",
        data,
    });

    return response.data;
};

export const uploadThumbnail = async (blogId, data) => {
    const response = await axios({
        baseURL,
        method: "put",
        url: `/blogs/${blogId}/thumbnail`,
        data,
    });
    return response.data;
};

export const updateBlog = async (blogId, data) => {
    const response = await axios({
        baseURL,
        method: "put",
        url: `/blogs/${blogId}`,
        data,
    });
    return response.data;
};
