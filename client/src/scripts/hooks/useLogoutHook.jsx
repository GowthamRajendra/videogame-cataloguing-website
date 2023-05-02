import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    // no need to make a request to log out
    // if we delete user from storage and 
    // change state to LOGOUT, user will be logged out
    const logout = () => {
        // delete logged in user from storage
        localStorage.removeItem('user');

        // dispatch logout action
        dispatch({ type: "LOGOUT" })
    }

    return { logout };
}