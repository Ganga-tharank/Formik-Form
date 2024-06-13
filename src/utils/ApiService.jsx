import axios from "axios";
const API_URL = "https://65a2438042ecd7d7f0a74ca8.mockapi.io";

const ApiService = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type" : "application/json"
    }
})

export default ApiService