import React from 'react';
import { Route } from 'react-router-dom';

import { GetRecord, Recording } from '../containers/Record';

function Record() {
    return (
        <>
            <Route exact path = '/record' component = { Recording }/>
            <Route path = '/record/auth' component = { GetRecord }/>
        </>
    )
};

export default Record;