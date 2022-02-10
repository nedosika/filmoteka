import React, {Suspense} from 'react';
import {useSelector} from "react-redux";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import Loader from "../components/Loader";
import DeleteFavoriteDialog from "../pages/Favorites/DeleteFovoriteDialog";
import AddDialog from "../pages/Films/AddDialog";
import DeleteFilmDialog from "../pages/Films/DeleteFilmDialog";
import EditFilmDialog from "../pages/Films/EditFilmDialog";

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
                            <Route path="/" element={<Home/>}/>
                            <Route path="films" element={<Films/>}>
                                <Route path="add" element={<AddDialog/>}/>
                                <Route path="remove/:id" element={<DeleteFilmDialog/>}/>
                                <Route path="edit/:id" element={<EditFilmDialog/>}/>
                            </Route>
                            <Route path="films/search" element={<Search/>}/>
                            <Route path="fav" element={<Favorites/>}>
                                <Route path="remove/:id" element={<DeleteFavoriteDialog/>}/>
                            </Route>
                            <Route path="*" element={<Navigate to="/films"/>}/>
                        </Routes>
                        : <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="films" element={<Films/>}>
                                <Route path="search" element={<Search/>}/>
                            </Route>
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