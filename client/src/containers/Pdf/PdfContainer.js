//pdf를 만드는 container
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as pdfActions from '../../redux/modules/pdf';
import * as recordActions from '../../redux/modules/record';
import storage from '../../lib/storage';

import { MainWrapper, Modal, Loading } from '../../components/Base';
import { MakePdfComponent } from '../../components/Pdf';


function PdfContainer() {
    const pdf = useSelector(state => state.pdf);
    const token = useSelector(state => state.auth.get('token'))
    const recordInfo = useSelector(state => state.record.get('recordInfo'));

    const downloadPath = pdf.getIn(['result', 'path']);

    const [loading, setLoading] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!token && !storage.get('token'))
            history.push('/');

        if(downloadPath) {
            setLoading(false);
        }

        return () => {
            dispatch(recordActions.initialize());
        };

    }, [token, history, dispatch, downloadPath]);

    const handleChangeDate = (e) => {
        const { value } = e.target;

        dispatch(pdfActions.setChangeCreatedDate({
            createdDate : value
        }));
    };

    const handleMakePdf = () => {
        try {
            dispatch(pdfActions.initializeResult());
            setLoading(true);
            
            const { title, professor, typeScript } = recordInfo;
            const createdDate = pdf.get('createdDate');

            //pdf파일을 만들고
            dispatch(pdfActions.makePdf({
                token,
                title,
                professor,
                createdDate,
                typeScript
            }));

            //record의 상태를 날린다 = 나중에 조회할 때 원치 않는 pdf가 만들어지는 것을 방지하기 위함
            dispatch(recordActions.initialize());

        } catch(e) {
            dispatch(pdfActions.setError({
                status : 500,
                message : '알 수 없는 에러가 발생했습니다.'
            }));
        }
    };

    const handleGoToDownloadPath = () => {
        window.open(downloadPath, '_blank');
    };


    return (
        <MainWrapper center = {
            <MakePdfComponent
                onChange = {handleChangeDate}
                onClick = {handleMakePdf}
                isLink = {downloadPath}
                link = {handleGoToDownloadPath}
            />
        } down = {
            <Modal open = {loading} header = "PDF를 생성하는 중입니다">
                <Loading/>
            </Modal>
        }/>
    );
};

export default PdfContainer;