import client from './client';

export const register = ({ email, name, password }) => 
    client.post('/user/rest-auth/registration/', { email, name, password })

export const login = ({ email, password }) =>
    client.post('/user/rest-auth/login/', { email, password })

export const logout = () =>
    client.post('/user/rest-auth/logout/', null);
