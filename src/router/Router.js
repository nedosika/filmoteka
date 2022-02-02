import React, {Suspense} from 'react';
import {useSelector} from "react-redux";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import Loader from "../components/Loader";
import Films from "../pages/Films/Films";

import {SELECTORS} from "../reducers";

const Home = React.lazy(() => import("../pages/Home"));
const SignIn = React.lazy(() => import("../pages/SignIn"));
const SignUp = React.lazy(() => import("../pages/SignUp"));

const Router = () => {
    const {isAuth} = useSelector(SELECTORS.auth);

    return (
        <Suspense fallback={<Loader/>}>
            <BrowserRouter>
                {
                    isAuth
                        ? <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/films" element={<Films/>}/>
                            <Route path="*" element={<Navigate to="/"/>}/>
                        </Routes>
                        : <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/films" element={<Films/>}/>
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