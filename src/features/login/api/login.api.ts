import axios, { type AxiosResponse } from "axios";
import api from "../../../shared/api/api";

export const loginApi = async (email: string, password: string): Promise<string | null> => {

    try {
        const payload = { "email": email, "password": password };

        // withCredentials is still needed for the httpOnly cookie to be set by the server
        const res: AxiosResponse = await api.post(`/api/auth/login`, payload, { withCredentials: true });
        return res.data.accessToken;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
            return null;
        } else {
            throw error;
        }
    }

}



