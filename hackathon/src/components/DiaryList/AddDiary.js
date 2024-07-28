import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 72vw;
    min-width: 700px;
`
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
`
const DiaryId = styled.div`
    display: flex;
    width: 56px;
    height: 35px;
    padding: 4px 12px;
    justify-content: center;
    align-items: center;
    border-radius: 17.5px;
    background-color: #69D1DE;

    font-size: 24px;
    font-weight: 700;
    line-height: 110%;
`
const TitleText = styled.div`
    font-size: 24px;
    font-weight: 700;
    line-height: 110%;
    margin: 0px 58px 0px 15px;
`
const DateText = styled.div`
    color: #6E6E73;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.2px;
`
const AddBtn = styled.div`
    display: flex;
    width: 516px;
    height: 196px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin: 23px auto 77px auto;
    cursor: pointer;

    text-align: center;
    font-size: 24px;
    font-weight: 600;
    line-height: 140%;
`

export const AddDiary = ({newDiaryId, date}) => {
    const navigate = useNavigate();
    const { petId } = useParams();

    const handleClick = () => {
        navigate(`/diary/${petId}/write`, { state: { newDiaryId } });
    };

    return(
        <MainContainer>
            <TitleContainer>
                <DiaryId>{newDiaryId}</DiaryId>
                <TitleText>오늘의 추억</TitleText>
                <DateText>{date}</DateText>
            </TitleContainer>
            <AddBtn onClick={handleClick}>오늘은 어떤 추억을 기록하게 될까요?</AddBtn>

        </MainContainer>
    );
}