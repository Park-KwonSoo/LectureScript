import client from './client';

export const makeRecordFile = ({ title, professor, file, token }) =>
    client.post('/records/recording/', { title, professor, file }, {
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