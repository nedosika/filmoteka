import {useEffect} from "react";

import {useAuth} from "./useAuth";
import {useRouter} from "./useRouter";

export function useRequireAuth(redirectUrl = "/signin") {
    const auth = useAuth();
    const {navigate} = useRouter();

    useEffect(() => {
        if (!auth.isAuth) {
            navigate(redirectUrl);
        }
    }, [auth, navigate]);
    return auth;
}