import { useMemo } from "react";

import {
    useParams,
    useLocation,
    useNavigate
} from "react-router-dom";

export function useRouter() {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    return useMemo(() => {
        return {
            pathname: location.pathname,
            location,
            navigate,
        };
    }, [params, location, navigate]);
}