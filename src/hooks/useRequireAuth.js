import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export function useRequireAuth(redirectUrl = "/signin") {
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isAuth) {
            navigate(redirectUrl);
        }
    }, [auth, navigate]);
    return auth;
}