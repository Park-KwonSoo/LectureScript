import client from './client';

export const makePdf = ({ title, professor, createdDate, typeScript, token }) =>
    client.post('/pdf/pdf/', { title, professor, createdDate, typeScript }, {
        headers : {
            'Authorization' : `token ${token}`
        }
    })