//현재 로그인한 유저의 recording data를 불러오는 container = 즉 여태까지의 출력 리스트를 가져온다.
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as recordActions from '../../redux/modules/record';
import storage from '../../lib/storage';

import { MainWrapper, Pagination, ErrorComponent } from '../../components/Base';
import { MyRecordListComponent } from '../../components/Record';


function GetRecordContainer () {
    const token = useSelector(state => state.auth.get('token'));
    const myRecordList = useSelector(state => state.record.get('myRecordList'));
    
    const error = useSelector(state => state.record.get('error'));
    const status = useSelector(state => state.record.get('status'));

    //페이지네이션
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);  //첫 페이지는 1
    const [postsPerPage] = useState(10);    //한 페이지당 10개

    const history = useHistory();
    const dispatch = useDispatch();


    useEffect(() => {
        if(!token && !storage.get('token'))
            history.push('/');
        
        if(!myRecordList) {
            handleGetMyRecordList();
        } else {
            const indexOfLastPost = currentPage * postsPerPage;
            const indexOfFirsPost = indexOfLastPost - postsPerPage;
            setPosts(myRecordList.slice(indexOfFirsPost, indexOfLastPost));
        }

    }, [token, history, myRecordList, currentPage]);

    const handleGetMyRecordList = () => {
        try {
            dispatch(recordActions.getRecordList({
                token
            }));

        }   catch(e) {
            dispatch(recordActions.setError({
                status : 500,
                message : '알 수 없는 에러가 발생했습니다.'
            }));
        }
    };

    const handlePagenate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    return (
        <MainWrapper center = {
            myRecordList ? 
            <MyRecordListComponent
                pagination = {
                    <Pagination
                        postsPerPage = {postsPerPage}
                        totalPosts = {myRecordList.length}
                        paginate = {handlePagenate}
                    />
                }>{posts}
            </MyRecordListComponent>
            :
            <div>
                정보를 불러올 수 없습니다
            </div>
        } down = {
            <ErrorComponent open = {error}>
                {`${status} : ${error}`}
            </ErrorComponent>
        }/>
    );
};

export default GetRecordContainer;