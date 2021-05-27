import React from 'react';
import { Route } from 'react-router-dom';

import { HomeContainer } from '../containers/Home';

function Home() {
    return (
        <>
            <Route path = '/' component = { HomeContainer }/>
        </>
    )
};

export default Home;