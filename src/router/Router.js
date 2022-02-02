import React, {Suspense} from 'react';
import {useSelector} from "react-redux";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import Loader from "../components/Loader";
import DeleteDialog from "../pages/Films/DeleteDialog";
import AddDialog from "../pages/Films/AddDialog";

const Home = React.lazy(() => import("../pages/Home"));
const Films = React.lazy(() => import("../pages/Films"));
const SignIn = React.lazy(() => import("../pages/SignIn"));
const SignUp = React.lazy(() => import("../pages/SignUp"));

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
                                <Route path="remove" element={<DeleteDialog/>}/>
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