import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function useRequireAuth(redirectUrl = '/signin') {
  const mapState = (state) => state.auth.isAuth;
  const isAuth = useSelector(mapState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate(redirectUrl);
    }
  }, [isAuth, navigate]);
  return isAuth;
}
