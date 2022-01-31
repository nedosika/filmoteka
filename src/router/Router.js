import React, {Suspense} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import Loader from "../components/Loader";
import {useAuth} from "../hooks/useAuth";

const Home = React.lazy(() => import("../pages/Home"));
const SignIn = React.lazy(() => import("../pages/SignIn"));
const SignUp = React.lazy(() => import("../pages/SignUp"));

const Router = () => {
    const {isAuth} = useAuth();

    return (
        <Suspense fallback={<Loader/>}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signin" element={isAuth ? <Navigate to='/'/> : <SignIn/>}/>
                    <Route path="/signup" element={isAuth ? <Navigate to='/'/> : <SignUp/>}/>
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
};

export default Router;