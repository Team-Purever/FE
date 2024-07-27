import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { PetProfile } from '../components/DiaryList/PetProfile';
import { DiaryItem } from '../components/DiaryList/DiaryItem';
import { AddDiary } from '../components/DiaryList/AddDiary';

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
    // 임시 데이터
    const data =
        {
            "name": "태백이",
            "age": 12,
            "url": "https://s3-alpha-sig.figma.com/img/8fcd/65d9/a4c3245bfdf0b26a01fb25d0f63a2469?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=J~XsnWk2x4fS6bogINT7r3jToFNSB32VG-pwBwlai-nGD5~lI~-HazNCKQdB7OcYU1~TLaYyyAI8lxfPcanilFNVrJHb4hsOKh2~8CmwZDTuK-xYB412F5Wuooz5nPM6Q1uaDi726QhttSG5Z0HHSB04g1bbcvfOgeEM6XKi3hqhfz7KCl9eoA9b7hw06wQReYl67kRYwP6a87BvELZ3QtkzzDn89D4Sf~rMBTgvi-3Z~ZBZh99n1bUMMIVN5TnXu7QCR0DwB~AF1pt-lpQl2dPIb6YWH~OmAnCXULSmLgroiU387YT5izqv-ePbX031DuCGStyZUAHvbZn6WSte~A__",
            "diaries": [
            {
                "diary_id": 2,
                "title": "가장 행복해 보였던 순간은 언제였나요?",
                "content": "일기내용!!!",
                "url": "https://s3-alpha-sig.figma.com/img/3b33/83cf/c9f514addaeb5e1b23ac4f6c69810740?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gg0bO6aXldWhPbojrGHUwrB2KeKMmb00-Z2Tlh7W7yWeqpFqzrEhWqTUx7-~GgDi3toBoyNlr~BNpQya4z6jwc-MtKwy5~H8hCYp5gzSkCsgLcLRhT5ojBaOLxb5Js7UHios8Jx5WWDyQfXxzuwaPwAqpLT480lweql56wxk1eXeollbemv0P~8zRSreh1eDXd1ps60FIjN1uP3X-z~UY~TGGoz2W~nzbqNWVca426bq5p~A0OxEsgPNMPVrYY2IQZc9WoQx6vb2J53hyFfcVVnBFexbwKjWpimpVqgJb9mk2fByx1Py~7DsK6ltaCv4OxEM2AnvnSz5DwaKlB2R8Q__",
                "created_at": "2024-07-26 10:30:00"
            },
            {
                "diary_id": 1,
                "title": "함께 여행을 떠난 경험이 있나요? 가장 기억에 남는 여행 에피소드를 들려 주세요.",
                "content": " 반려동물 놀이터에 처음 간 날이 가장 행복해 보였다. 몸집도 큰데 아파트에 사는 바람에 마음껏 뛰놀지도 못하고 조금만 쿵쾅거려도 안된다고 외치기 바빴는데 사실 조금만 쿵쾅이 아니긴 했다. 어쨌든 그렇게 나름대로 절제하다가 놀이터에서 고삐가 풀린 거 보고 저렇게 좋을까 싶기도 하면서 내가 덩달아 해방감을 느끼기도 했다. ",
                "url": "https://s3-alpha-sig.figma.com/img/4c89/c100/4f7b48fe32a32657fb275ab6af6ef2d6?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OdzHep5UyZ9yKxiik0Wf-dDtEWqGJBQVRcGZs9os~kdO-1mLipUns7000oEY2SS8xsVeHaGwI~LDkUSGLre3SqrGIgfe3WFdtbyzCNKaHBjFhngj2Zc-RiiuvEho26jOHaChj7nWCbYDJFP5s2PjrHViaqHMhIzSHTAXBdUtvvjkavAzUk-j5Z~q3sClAQ5xpViAaFrb9dROv2NYJvcX9jqBjyPoz2mjbXyLLzypBuiGZraK0t5GnzC0yWeZQn86RRkvyoeEit7O~SE~PdDJgt8ECz4lozaeEpsFvyFbnsz4M71ayL5npQ~YqPYOeLEOmZEaGHVbEH~s4kvIqEzVQQ__",
                "created_at": "2024-07-22 15:20:00"
            }
            ]
        }





    const { petId } = useParams(); // petId써서 get요청
    const [daysPassed, setDaysPassed] = useState(1);
    const [newDiaryId, setNewDiaryId] = useState(1); 
    const [canAddDiary, setCanAddDiary] = useState(true);


    useEffect(() => {
      if (data.diaries.length > 0) {

        // 새로운 질문 넘버 계산
        const recentDiary = data.diaries[0];
        setNewDiaryId(recentDiary.diary_id + 1);
        

        // 처음 기록한 날 부터 며칠 지났는지 계산
        const firstDiary = data.diaries[data.diaries.length - 1];
        const firstDate = new Date(firstDiary.created_at.split(' ')[0]);
        const today = new Date();
  
        const timeSinceFirst = today - firstDate;
        const daySinceFirst = Math.ceil(timeSinceFirst / (1000 * 60 * 60 * 24)) + 1;
  
        setDaysPassed(daySinceFirst);


        // 가장최근에 기록한 시점부터 몇 시간 지났는지 계산
        const timeSinceRecent = today - new Date(recentDiary.created_at);;
        const hoursSinceRecent = timeSinceRecent / (1000 * 60 * 60);
        setCanAddDiary(hoursSinceRecent >= 24);
      }
    }, [data.diaries]);

    // 오늘 날짜 포맷팅
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return (
        <>
            <Navbar/> 
            <MainContainer>
                <PetProfile url={data.url} age={data.age} name={data.name} day={daysPassed}/>
                <GreyLine/>
                {canAddDiary && <AddDiary newDiaryId={newDiaryId} date={formattedDate}/>}
                {data.diaries.map((diary) => (
                <DiaryItem 
                    key={diary.diary_id}
                    diary_id={diary.diary_id}
                    title={diary.title}
                    content={diary.content}
                    url={diary.url}
                    date={diary.created_at.split(' ')[0]}
                />
                 ))}
            </MainContainer>
        </>
    );
}

export default DiaryList;
