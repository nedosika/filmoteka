import React from "react";

import Layout from "../../Layout";
import Loader from "../../components/Loader";
import {useRequireAuth} from "../../hooks/useRequireAuth";


const Home = () => {
    const auth = useRequireAuth('/signin');

    if (!auth) {
        return <Loader/>;
    }

    return (
        <Layout title={`Home`}>
            Home
        </Layout>);
}

export default Home;