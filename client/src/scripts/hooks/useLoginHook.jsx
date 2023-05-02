import { useState } from "react";
import { useAuthContext } from "./useAuthContext.jsx";

import $ from 'jquery';

export const userLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null); // if request is made
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        $.ajax({
            url: "http://localhost:3000/user/login",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ email, password }),
            success: function (data) {
                // saving email, JWT to browser local storage
                localStorage.setItem('user', JSON.stringify(data));

                // update auth context. dispatch an action (login the user)
                dispatch({ type: "LOGIN", payload: data });

                setLoading(false);
            },
            error: function (error) {
                console.log(error.responseJSON.error);
                setLoading(false);
                setError(error.responseJSON.error);
            }
        });
    };

    return { login, loading, error };
}