import client from './client';

const makePdf = ({ title, professor, createdDate, typeScript, token }) =>
    client.post('/pdf/pdf/', { title, professor, createdDate, typeScript }, {
        headers : {
            'Authorization' : `token ${token}`
        }
    })

export default makePdf;