// import axios from 'axios'

// const API_BASE_URL = 'http://localhost:5001'

// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// export const setApiBaseUrl = (newBaseUrl) => {
//   apiClient.defaults.baseURL = newBaseUrl
// }

// export default apiClient
//---------------------------------

import axios from "axios";

const API_BASE_URL = "http://localhost:5001";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2M3ZGU2MDMyZTFjMjA1MGQ4YWExNWIiLCJpYXQiOjE3NDE5Mjk0MTQsImV4cCI6MTc0MjUzNDIxNH0.8w9CG8ghQqN7nAgP4fJnEfVFmfrPE2WcE0Rda1bBYFQ"
  },
});

// export const setAuthToken = (token) => {
//   if (token) {
//     apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
//     localStorage.setItem("token", token); 
//   } else {
//     delete apiClient.defaults.headers["Authorization"];
//     localStorage.removeItem("token"); 
//   }
// };

// const savedToken = localStorage.getItem("token");
// if (savedToken) {
//   setAuthToken(savedToken);
// }

export default apiClient;
