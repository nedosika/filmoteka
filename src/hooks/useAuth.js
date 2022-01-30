import React, { useState, useEffect, useContext, createContext } from "react";

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const signin = (email, password) => {
        setUser({email, password})
    };
    const signup = (email, password) => {
        setUser({email, password})
    };
    const signout = () => {
        // return firebase
        //     .auth()
        //     .signOut()
        //     .then(() => {
        //         setUser(false);
        //     });
        setUser(false)
    };
    const sendPasswordResetEmail = (email) => {

    };
    const confirmPasswordReset = (code, password) => {

    };

    // useEffect(() => {
    //     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //             setUser(user);
    //         } else {
    //             setUser(false);
    //         }
    //     });
    //     // Cleanup subscription on unmount
    //     return () => unsubscribe();
    // }, []);

    return {
        user,
        signin,
        signup,
        signout,
        sendPasswordResetEmail,
        confirmPasswordReset,
    };
}