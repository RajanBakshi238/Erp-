import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:4000/api/v1",
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        
      },
      withCredentials: true 
})

export const postData = async (endPoint, body) => {
    const response = await api.post(endPoint, body).catch(err => err.response);
    return response?.data;
}

export const getData = async (endPoint) => {
    const response = await api.get(endPoint).catch(err => err.response);
    return response?.data
}