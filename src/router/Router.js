import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp/SignUp";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}>
                {/*<Route path="words" element={<Words/>}>*/}
                {/*    <Route path="add" element={<AddWordDialog/>}/>*/}
                {/*</Route>*/}
                {/*<Route path="games/:id" element={<Games/>}>*/}
                {/*    <Route path="add" element={<AddWordsDialog/>}/>*/}
                {/*</Route>*/}
                {/*<Route path="boards/:id" element={<Boards/>}>*/}
                </Route>
                <Route path="/signIn" element={<SignIn/>}/>
                <Route path="/signUp" element={<SignUp/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;