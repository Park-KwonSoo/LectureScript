import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';

import * as authActions from './redux/modules/auth';
import * as pdfActions from './redux/modules/pdf';
import * as recordActions from './redux/modules/record';

import storage from './lib/storage';

import { Auth, Home, Pdf, Record } from './pages';

import { BackButton, Header, HeaderButton } from './components/Base';

function App() {
  const token = useSelector(state => state.auth.get('token'));
  const storagedToken = storage.get('token');

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if(storagedToken && !token)
      dispatch(authActions.setToken(storagedToken));

  }, [history, storagedToken, token, dispatch]);

  const handleGoHome = () => {
    dispatch(recordActions.initialize());
    dispatch(pdfActions.initialize());
    history.push('/');
  };

  const handleGoBack = () => {
    history.goBack();
  };

  const handleRegister = () => {
    history.push('/auth/register');
  };

  const handleLogout = () => {
    history.push('/auth/logout');
  };

  const handleGetMyRecordList = () => {
    history.push('/record/auth');
  };

  return (
    <>
      {
        token ?
        <Header onClick = {handleGoHome}
          Left_Button = {<BackButton onClick = {handleGoBack}/>}
          Right_left_Button = {<HeaderButton button_name = '내 기록' onClick = {handleGetMyRecordList}/>}
          Right_right_Button = {<HeaderButton button_name = 'Logout' onClick = {handleLogout}/>}
        /> : 
        <Header onClick = {handleGoHome}
          Right_right_Button = {<HeaderButton button_name = '회원 가입' onClick = {handleRegister}/>}
        />
      }
      <Route exact path = '/' component = { Home }/>
      <Route path = '/auth' component = { Auth }/>
      <Route path = '/pdf' component = { Pdf }/>
      <Route path = '/record' component = { Record }/>
    </>
  );
}

export default App;
