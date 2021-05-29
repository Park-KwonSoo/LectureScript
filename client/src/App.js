import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';

import * as authActions from './redux/modules/auth';
import storage from './lib/storage';

import { Auth, Home, Pdf, Record } from './pages';

function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const storagedToken = storage.get('token');
    if(storagedToken)
      dispatch(authActions.setToken(storagedToken));

  }, [history, dispatch])

  return (
    <>
      <Route exact path = '/' component = { Home }/>
      <Route path = '/auth' component = { Auth }/>
      <Route path = '/pdf' component = { Pdf }/>
      <Route path = '/record' component = { Record }/>
    </>
  );
}

export default App;
