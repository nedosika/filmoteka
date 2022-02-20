import React, {Suspense} from 'react';
import {useSelector} from "react-redux";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import Loader from "../components/Loader";

const Film = React.lazy(() => import("../pages/Film"));
const Home = React.lazy(() => import("../pages/Home"));
const Films = React.lazy(() => import("../pages/Films"));
const SignIn = React.lazy(() => import("../pages/SignIn"));
const SignUp = React.lazy(() => import("../pages/SignUp"));
const Search = React.lazy(() => import("../pages/Search"));
const Favorites = React.lazy(() => import("../pages/Favorites"));

const Router = () => {
    const isAuth = useSelector(({auth}) => auth.isAuth);

    return (
        <Suspense fallback={<Loader/>}>
            <BrowserRouter>
                {
                    isAuth
                        ? <Routes>
                            <Route path="/" element={<Films/>}/>
                            <Route path="/home" element={<Home/>}/>
                            <Route path="film/:id" element={<Film/>}/>
                            <Route path="films" element={<Films/>}/>
                            <Route path="search" element={<Search/>}/>
                            <Route path="fav" element={<Favorites/>}/>
                            <Route path="*" element={<Navigate to="/films"/>}/>
                        </Routes>
                        : <Routes>
                            <Route path="/" element={<Films/>}/>
                            <Route path="/home" element={<Home/>}/>
                            <Route path="film/:id" element={<Film/>}/>
                            <Route path="films" element={<Films/>}/>
                            <Route path="search" element={<Search/>}/>
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