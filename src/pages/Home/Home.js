import React from "react";

import Layout from "../../Layout";
import Loader from "../../components/Loader";
import {useRequireAuth} from "../../hooks/useRequireAuth";
import {useSelector} from "react-redux";


const Home = () => {
    const auth = useSelector((state) => {
        return state.auth
    })


    if (!auth) {
        return <Loader/>;
    }

    return (
        <Layout title={`Home`}>
            Home
        </Layout>);
}

export default Home;