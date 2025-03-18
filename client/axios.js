import axios from "axios"

const makeRequest = axios.create({
    baseURL: 'http://localhost:5000/api', // Replace with your actual base URL
    withCredentials: true, // This includes credentials (like cookies) in cross-origin requests
    headers: {
      'Content-Type': 'application/json', // Default headers for JSON requests
    },
  });
  export default makeRequest;