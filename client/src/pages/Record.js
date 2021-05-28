import React from 'react';
import { Route } from 'react-router-dom';

import { GetRecordById, GetRecord, Recording } from '../containers/Record';

function Record() {
    return (
        <>
            <Route exact path = '/record' component = { Recording }/>
            <Route exact path = '/record/auth' component = { GetRecord }/>
            <Route path = '/record/auth/:recordId' component = { GetRecordById }/>
        </>
    )
};

export default Record;