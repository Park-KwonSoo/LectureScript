import client from './client';

const makeRecordFile = ({ title, professor, file, token }) =>
    client.post('/records/recording/', { title, professor, file }, {
        headers : {
            'Authorization' : `token ${token}`
        }
    })

const getRecordList = ({ token }) =>
    client.get('/records/recording/', null, {
        headers : {
            'Authorization' : `token ${token}`
        }
    })

const getRecordById = ({ record_id, token }) =>
    client.get('/record/recording/' + record_id, null, {
        headers : {
            'Authorization' : `token ${token}`
        }
    })

export default makeRecordFile;
export default getRecordList;
export default getRecordById;