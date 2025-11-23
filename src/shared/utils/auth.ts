import axios from "axios";
import api from "../api/api";
import { parseJWT } from "./jwt";

export type User = {
    _id: string;
    name: string;
    email: string;
}

// URL of backend server
const API_URL = import.meta.env.VITE_API_URL;


/**
 * Automatically re-logs in on page load.  
 * Sends refresh token to backend for validation.  
 * If valid, replaces access token and refresh token.
 * 
 * Refresh token is set as a httpOnly Secure cookie.
 * 
 * 
 * @returns {string | null} JWT access token
 */
export const autoLogin = async (): Promise<string | null> => {
    const oldAccessToken = localStorage.getItem("accessToken");

    if (!oldAccessToken) {
        console.warn("accessToken not found, do nothing");
        return null;
    }

    const accessToken: string | null = await refreshTokens();

    if (accessToken) {
        localStorage.setItem("accessToken", accessToken);      
        return accessToken;
    } else{
        console.warn("refresh token has expired, do nothing");
        localStorage.removeItem("accessToken");
        return null;
    }
    
}


export const refreshTokens = async (): Promise<string | null> => {
    try {
        const res = await api.get(`/api/auth/refresh`, { withCredentials: true });
        return res.data.accessToken;

    } catch(error: any) {
        console.log(error.response.data);
        return null;
    }
}


export const getUser = async (jwt: string): Promise<User> => {
    const payload = parseJWT(jwt);
    const userData = await api.get(`/api/user/${payload.sub}`);
    
    return userData.data;
}


export const clearTokens = async (): Promise<void> => {
    localStorage.removeItem("accessToken");
    await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
}
