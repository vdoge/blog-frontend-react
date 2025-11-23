import { loginApi } from "../api/login.api";


export const signInLogic = async (email: string, password: string, callback: Function): Promise<void> => {
    
    const accessToken: string | null = await loginApi(email, password);

    if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        callback(accessToken);
    } else {
        alert("failed to log in");
    }

}
