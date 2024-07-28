import styled from "styled-components";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import questions from "../assets/Data/questions.json";
import { DiaryImageUpload } from "../components/Write, Edit Diary/DiaryImageUpload.js";

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const NumText = styled.div`
    color: #69D1DE;
    text-align: center;
    font-size: 48px;
    font-weight: 700;
    margin: 82px 0px 21px 0px;
`;
const QuestionText = styled.div`
    text-align: center;
    font-size: 48px;
    font-weight: 700;
`;
const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 52vw;
    border-top: 1px solid #E5E5EA;
    margin-top: 80px;
`;

const WriteDiary = () => {
    const location = useLocation();
    const { newDiaryId } = location.state || {};
    const [image, setImage] = useState(null);

    // 새 질문 받아오기
    const newQuestions = (newDiaryId <= 15) ? questions[newDiaryId-1] : "오늘의 추억을 기록해주세요."; 

    return (
        <>
            <Navbar />
            <MainContainer>
                <NumText>Q{newDiaryId}</NumText>
                <QuestionText>{newQuestions}</QuestionText>
                <ContentContainer>
                    <DiaryImageUpload image={image} setImage={setImage} />
                </ContentContainer>
            </MainContainer>
        </>
    );
};

export default WriteDiary;
