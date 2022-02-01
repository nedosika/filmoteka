import React, { useState, useEffect, useContext, createContext } from "react";

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

const initialState = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : null

function useProvideAuth() {
    const [user, setUser] = useState(initialState);
    const isAuth = Boolean(user);

    const signIn = async (email, password) => {
        try {
            const response = await fetch('https://rj2zi.sse.codesandbox.io/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({email, password})
            })
            if (response.status === 200) {
                const data = await response.json();
                localStorage.setItem('auth', JSON.stringify(data.data));
                setUser(data.data);
            }
            if (response.status === 400) {
                const data = await response.json();
                throw new Error(data.message);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const signUp = async (email, password) => {
        try {
            const response = await fetch('https://rj2zi.sse.codesandbox.io/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({email, password})
            })
            if (response.status === 201) {
                const data = await response.json();
                localStorage.setItem('auth', JSON.stringify(data.data));
                setUser(data.data);
            }
            if (response.status === 409) {
                const data = await response.json();

                console.log(data)
                throw new Error(data.message);
            }
            if (response.status === 400) {
                const data = await response.json();
                console.log(data)
                throw new Error(data.message);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };
    const signOut = () => {
        localStorage.removeItem('auth');
        setUser(false)
    };

    return {
        user,
        isAuth,
        signIn,
        signUp,
        signOut
    };
}