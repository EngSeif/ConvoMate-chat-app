/**
 * `axiosInstance` - A custom Axios instance configured with a base URL and credentials handling.
 *
 * This instance is set up to send HTTP requests to the backend server located at `http://localhost:5000/api`.
 * It also ensures that credentials (cookies, authorization headers, etc.) are sent with each request.
 * 
 * @module axiosInstance
 */

import axios from "axios"; // Axios library for making HTTP requests

export const axiosInstance = axios.create({
    /**
     * @property {string} baseURL - The base URL for all API requests. In this case, it is set to `http://localhost:5000/api`.
     * All requests made using this instance will automatically use this base URL.
     */
    baseURL: "http://localhost:5000/api",

    /**
     * @property {boolean} withCredentials - Ensures that cookies and other credentials are sent along with each request.
     * Set to `true` to include credentials with every request.
     */
    withCredentials: true
});
