import React, {Suspense} from 'react';
import {useSelector} from "react-redux";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import Loader from "../components/Loader";
import AddFilmDialog from "../components/AddFilmDialog";

const Home = React.lazy(() => import("../pages/Home"));
const SignIn = React.lazy(() => import("../pages/SignIn"));
const SignUp = React.lazy(() => import("../pages/SignUp"));
const Films = React.lazy(() => import("../pages/Films"));

const Router = () => {
    const isAuth = useSelector((state) => state.auth.isAuth);

    return (
        <Suspense fallback={<Loader/>}>
            <BrowserRouter>
                {
                    isAuth
                        ? <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="films" element={<Films/>}>
                                <Route path="add" element={<AddFilmDialog/>}/>
                            </Route>
                            <Route path="*" element={<Navigate to="/"/>}/>
                        </Routes>
                        : <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="films" element={<Films/>}/>
                            <Route path="signin" element={<SignIn/>}/>
                            <Route path="signup" element={<SignUp/>}/>
                            <Route path="*" element={<Navigate to="/signin"/>}/>
                        </Routes>
                }
            </BrowserRouter>
        </Suspense>
    );
};

export default Router;