import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { PetProfile } from '../components/DiaryList/PetProfile';
import { DiaryItem } from '../components/DiaryList/DiaryItem';
import { AddDiary } from '../components/DiaryList/AddDiary';
import { axiosInstance } from '../api';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
` 
const GreyLine = styled.hr`
    background: #E5E5EA;
    width: 72vw;
    margin: 93px 0px 32px 0px;
`

const DiaryList = () => {
    
    const { petId } = useParams();
    const [data, setData] = useState(null);
    const [daysPassed, setDaysPassed] = useState(1);
    const [newDiaryId, setNewDiaryId] = useState(1);
    const [canAddDiary, setCanAddDiary] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem('access_token');

                const response = await axiosInstance.get(`/diaries/${petId}/diary`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [petId]);

    useEffect(() => {
        if (data && data.diaries.length > 0) {
            // 새로운 질문 넘버 계산
            setNewDiaryId(data.diaries.length + 1);

            // 처음 기록한 날 부터 며칠 지났는지 계산
            const firstDiary = data.diaries[data.diaries.length - 1];
            const firstDate = new Date(firstDiary.created_at.split('T')[0]);
            const today = new Date();

            const timeSinceFirst = today - firstDate;
            const daySinceFirst = Math.ceil(timeSinceFirst / (1000 * 60 * 60 * 24));

            setDaysPassed(daySinceFirst);

            // 가장최근에 기록한 시점부터 몇 시간 지났는지 계산
            const recentDiary = data.diaries[0];
            const timeSinceRecent = today - new Date(recentDiary.created_at);
            const hoursSinceRecent = timeSinceRecent / (1000 * 60 * 60);
            setCanAddDiary(hoursSinceRecent >= 24);
        } else {
            setCanAddDiary(true);
            setNewDiaryId(1);
        }
    }, [data]);

    // 오늘 날짜 포맷팅
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return (
        <>
            <Navbar />
            <MainContainer>
                {data && (
                    <>
                        <PetProfile url={data.url} age={data.age} name={data.name} day={daysPassed} />
                        <GreyLine />
                        {canAddDiary && <AddDiary newDiaryId={newDiaryId} date={formattedDate} />}
                        {data.diaries.map((diary, index) => (
                            <DiaryItem 
                                key={index}
                                diaryId={diary.id}
                                diaryIndex={data.diaries.length - index}
                                title={diary.title}
                                content={diary.content}
                                url={diary.url}
                                date={diary.created_at.split('T')[0]}
                            />
                        ))}
                    </>
                )}
            </MainContainer>
        </>
    );
};

export default DiaryList;