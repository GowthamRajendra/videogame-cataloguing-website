import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext();

// state is previous state
// action is login or log out
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload } //payload is user from server
        case 'LOGOUT':
            return { user: null }
        default:
            return state; // no change so return prev state
    }

}

// custom component that will wrap other components
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null //user will not be logged in when site loads
    });

    // check if user is logged in
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        //if user exists, dispatch action for login
        if (user) {
            dispatch({ type: "LOGIN", payload: user });
        }
    }, [])

    // logging log in/logout messsage
    console.log('AuthContext state: ', state);

    // children is what it wraps
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};