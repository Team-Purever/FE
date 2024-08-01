import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import questions from "../assets/Data/questions.json";
import { DiaryImageUpload } from "../components/Write, Edit Diary/DiaryImageUpload.js";
import { DiaryInput } from "../components/Write, Edit Diary/DiaryInput.js";
import { axiosInstance } from "../api/index.js";

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
const ButtonContainer = styled.div`
    display: flex;
    margin: 79px 0px 175px 0px;
    gap: 17px;
`;
const MintButton = styled.div`
    display: flex;
    padding: 24px 61px;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    background: #69D1DE;
    cursor: pointer;

    color: white;
    font-size: 24px;
    font-weight: 700;
    line-height: 110%;

    &:hover {
        background-color: #5cc3d3;
    }
`;
const WhiteButton = styled.div`
    display: flex;
    padding: 24px 61px;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    border: 2px solid #69D1DE;
    cursor: pointer;

    font-size: 24px;
    font-weight: 700;
    line-height: 110%;

    &:hover {
        background-color: #f0f8fb;
    }
`;
const ErrorText = styled.div`
    color: red;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.2px;
    margin-top: 5px;
`

const WriteDiary = () => {
    const navigate = useNavigate();
    const { petId } = useParams();

    const location = useLocation();
    const { newDiaryId } = location.state || {};

    const [image, setImage] = useState(null);
    const [diaryText, setDiaryText] = useState("");
    const [imageError, setImageError] = useState(false);

    // 새 질문 받아오기
    const newQuestions = (newDiaryId <= 15) ? questions[newDiaryId-1] : "오늘의 추억을 기록해주세요."; 

    const submit = async() => {
        let valid = true;
        if(!image) {
            setImageError(true);
            valid = false;
        }

        if(valid) {
            const diaryData = {
                title: newQuestions,
                url: image, // 임시 사진 정보
                content: diaryText
            }
            try{
                const accessToken = localStorage.getItem('access_token');
                const response = await axiosInstance.post(`/diaries/pets/${petId}/`, diaryData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                navigate(`/diary/${petId}`); // 해당 반려동물 추억일기장으로 이동

            } catch (error) {
                console.error(error);
            }
        }
    }
    return (
        <>
            <Navbar />
            <MainContainer>
                <NumText>Q{newDiaryId}</NumText>
                <QuestionText>{newQuestions}</QuestionText>
                <ContentContainer>
                    <DiaryImageUpload image={image} setImage={setImage} />
                    {imageError && <ErrorText>사진을 등록해주세요</ErrorText>}
                    <DiaryInput value={diaryText} onChange={(e) => setDiaryText(e.target.value)}/>
                </ContentContainer>
                <ButtonContainer>
                    <MintButton onClick={submit}>기록하기</MintButton>
                    <WhiteButton onClick={() => {navigate(`/diary/${petId}`);}}>취소하기</WhiteButton>
                </ButtonContainer>
            </MainContainer>
        </>
    );
};

export default WriteDiary;
