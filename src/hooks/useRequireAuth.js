import {useEffect} from "react";

import {useAuth} from "./useAuth";
import {useRouter} from "./useRouter";

export function useRequireAuth(redirectUrl = "/signup") {
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (auth.user === false) {
            router.push(redirectUrl);
        }
    }, [auth, router]);
    return auth;
}