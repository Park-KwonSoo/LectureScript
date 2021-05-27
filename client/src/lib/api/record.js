import client from './client';

export const makeRecordFile = ({ title, professor, file, token }) =>
    client.post('/records/recording/', { title, professor, file }, {
        headers : {
            'Authorization' : `token ${token}`
        }
    })

export const getRecordList = ({ token }) =>
    client.get('/records/recording/', null, {
        headers : {
            'Authorization' : `token ${token}`
        }
    })

export const getRecordById = ({ record_id, token }) =>
    client.get('/record/recording/' + record_id, null, {
        headers : {
            'Authorization' : `token ${token}`
        }
    })