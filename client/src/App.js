import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';

import storage from './lib/storage';

import { Auth, Home, Pdf, Record } from './pages';

function App() {
  return (
    <>
      <Route exact path = '/' component = { Home }/>
      <Route path = '/auth' component = { Auth }/>
      <Route path = '/pdf' component = { Pdf }/>
      <Route path = '/Record' component = { Record }/>
    </>
  );
}

export default App;
