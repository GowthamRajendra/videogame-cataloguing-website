import { AuthContext } from "../context/authContext";
import { useContext } from "react";

// hook to use auth context 
export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext must be inside AuthContextProvider');
    }

    return context;
}