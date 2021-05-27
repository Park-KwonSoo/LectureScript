import client from './client';

const register = ({email, name, password}) => 
    client.post('/user/rest-auth/registration/', { email, name, password })

const login = ({email, password}) =>
    client.post('/user/rest-auth/login/', { email, password })

const logout = () =>
    client.post('/user/rest-auth/logout/', null);

export default register;
export default login;
export default logout;
