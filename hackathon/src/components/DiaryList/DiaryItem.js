import styled from "styled-components";
import edit from "../../assets/images/DiaryList/edit.svg"
import { useParams, useNavigate } from "react-router-dom";

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
const EditBtn = styled.img`
    width: 17px;
    height: 17px;
    cursor: pointer;
    margin-left: 29px;
`
const ContentText = styled.div`
    font-size: 20px;
    font-weight: 400;
    line-height: 150%;
    margin: 27px 0px 50px 0px;
`
const Img = styled.img`
    width: 100%;
    height: 730px;
    border-radius: 15px;
    object-fit: cover;
    margin-bottom: 77px;
`

export const DiaryItem = ({diaryId, diaryIndex, title, content, url, date}) => {
    const { petId } = useParams();
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/diary/${petId}/edit`, { state: { diaryId: diaryId, diaryIndex: diaryIndex, title: title, content: content, url: url } });
    }
    return(
        <MainContainer>
            <TitleContainer>
                <DiaryId>{diaryIndex}</DiaryId>
                <TitleText>{title}</TitleText>
                <DateText>{date}</DateText>
                <EditBtn src={edit} onClick={handleEditClick}/>
            </TitleContainer>
            <ContentText>{content}</ContentText>
            <Img src={url}/>
        </MainContainer>
    );
}