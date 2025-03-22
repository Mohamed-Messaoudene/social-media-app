import axios from "axios";
const server_url = import.meta.env.VITE_SERVER_URL;
export const makeRequest = axios.create({
    baseURL:`${server_url}/api`,
    withCredentials: true,}) 