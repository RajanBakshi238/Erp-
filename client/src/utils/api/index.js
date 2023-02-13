import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:4000/api/v1",
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
})

export const postData = async (endPoint, body) => {
    const response = api.post(endPoint, body).catch(err => err.response);
    return response?.data;
}