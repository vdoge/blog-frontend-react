import { createContext, useContext, useEffect, useRef, useState } from "react";
import { autoLogin, getUser, clearTokens, type User } from "../utils/auth";

/**
 * Stores User data and handles automatic re-login on page mount.
 */


type AuthContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    logout: () => void;
}

type AuthStoreProps = { children: React.ReactNode };

// Context instance
const AuthContext = createContext<AuthContextType| null>(null);


export const AuthStore = ({ children }: AuthStoreProps) => {
    const [ user,  setUser ] = useState<any | null>(null);
    const loginLock = useRef(false);

    const logout = () => {
        setUser(null);
        clearTokens();
    }

    useEffect(() => {

        const autoLoginWrapper = async () => {
            if (user == null && !loginLock.current) {
                loginLock.current = true;

                const token = await autoLogin()
                if (token) {
                    const userData = await getUser(token);
                    setUser(userData);
                }
                
                loginLock.current = false;
            }
        }

        autoLoginWrapper();
        
    }, [])


    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            { children }
        </AuthContext.Provider>
    );

}


export const useAuthStore = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("useAuthStore must be used inside <AuthStore>");
    return authContext;
}


