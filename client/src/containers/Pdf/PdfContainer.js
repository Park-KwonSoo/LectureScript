//pdf를 만드는 container
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as pdfActions from '../../redux/modules/pdf';
import * as recordActions from '../../redux/modules/record';

function PdfContainer() {
    const pdf = useSelector(state => state.pdf);
    const token = useSelector(state => state.auth.get('token'))
    const recordInfo = useSelector(state => state.record.get('recordInfo'));

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(pdfActions.initialize());

        if(!token)
            history.push('/');

    }, [token, history, dispatch]);

    const handleChangeDate = (e) => {
        const { value } = e.target;

        dispatch(pdfActions.setChangeCreatedDate({
            createdDate : value
        }));
    }

    const handleMakePdf = () => {
        try {
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

            //홈 화면으로
            history.push('/');

        } catch(e) {
            dispatch(pdfActions.setError({
                message : '알 수 없는 에러가 발생했습니다.'
            }));
        }
    }


    //toDo : 다운로드 링크 추가
    return (
        <>
            <input name = 'createdDate' type = 'date' onChange = {handleChangeDate}/>
            <button onClick = {handleMakePdf}>Make PDF</button>
        </>
    );
};

export default PdfContainer;