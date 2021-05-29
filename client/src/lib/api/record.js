import client from './client';

export const makeRecordFile = (formData, token) =>
    client.post('/records/recording/', formData, {
        headers : {
            'Authorization' : `token ${token}`
        }
    })

export const getRecordList = ({ token }) =>
    client.get('/records/recording/', {
        headers : {
            'Authorization' : `token ${token}`
        }
    })

export const getRecordById = ({ recordId, token }) =>
    client.get('/records/recording/' + recordId, {
        headers : {
            'Authorization' : `token ${token}`
        }
    })