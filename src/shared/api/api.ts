import axios, { type AxiosResponse } from "axios";
import { refreshTokens } from "../utils/auth";

// URL of backend server
const API_URL = import.meta.env.VITE_API_URL;

// create custom axios instance
const api = axios.create({ baseURL: API_URL });

// Lock boolean, prevents multiple refresh API calls
let isRefreshingToken: boolean = false;

// requests that failed due to expired accessToken are put in here
// to be retried after the tokens have been refreshed
let retryQueue: any[] = [];


/**
 * Add access token to ever requests
 */
api.interceptors.request.use((req) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return req;
});


/**
 * Intercepts every response.  
 * If a 401 response is returned, its marked as _retry and added to a retryQueue.  
 * Once a new access token is acquired and then all requests in the retryQueue are retied.
 * 
 * Success 2XX and non 401 errors are passed through
 */
api.interceptors.response.use((res) => res, async (error: AxiosResponse) => {
    const originalRequest = error.config;

    if (error.status === 401 && !originalRequest.headers._retry && originalRequest.url != "/api/auth/refresh") {
        originalRequest.headers._retry = true;
        console.error(`${originalRequest.method} ${originalRequest.url} authentication failed with 401. Moved to the retry queue.`);
        retryQueue.push(originalRequest);
        
        if (!isRefreshingToken) {
            refreshTokensAndRetryRequests();
        }
        
    } else {
        return Promise.reject(error);
    }
});


const refreshTokensAndRetryRequests = async (): Promise<void> => {
    if (!isRefreshingToken) {
        isRefreshingToken = true;

        const accessToken: string | null = await refreshTokens()
        
        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
 
            retryQueue.forEach(req => {
                req.headers.Authorization = `Bearer ${accessToken}`;

                // retry the whole request with the custom axios instance
                api(req);
            });
        }

        retryQueue = [];
        isRefreshingToken = false;
    }
}


export default api;