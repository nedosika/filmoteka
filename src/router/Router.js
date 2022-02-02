import React, {Suspense} from 'react';
import {useSelector} from "react-redux";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import Loader from "../components/Loader";


const Home = React.lazy(() => import("../pages/Home"));
const SignIn = React.lazy(() => import("../pages/SignIn"));
const SignUp = React.lazy(() => import("../pages/SignUp"));

const Router = () => {
    const {isAuth} = useSelector(state => state.auth);

    return (
        <Suspense fallback={<Loader/>}>
            <BrowserRouter>
                {
                    isAuth
                        ? <Routes>
                            <Route path="/" exact element={<Home/>}/>
                            <Route path="*" element={<Navigate to="/"/>}/>
                        </Routes>
                        : <Routes>
                            <Route path="/" exact element={<Home/>}/>
                            <Route path="/signin" element={<SignIn/>}/>
                            <Route path="/signup" element={<SignUp/>}/>
                            <Route path="*" element={<Navigate to="/signin"/>}/>
                        </Routes>
                }
            </BrowserRouter>
        </Suspense>
    );
};

export default Router;