import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { Navbar } from "../components/Navbar/Navbar";
import { PetCard } from "../components/ChoosePet/PetCard";
import plus from "../assets/images/RegisterPet, ChoosePet, WriteDiary/plus.svg";

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const MainText = styled.div`
    text-align: center;
    font-size: 48px;
    font-weight: 700;
    margin-top: 9vh;
`
const SubText = styled.div`
    color: #212121;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.2px;
    margin: 20px 0px 90px 0px;
`
const PetContainer = styled.div`
    width: 1500px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 75px;
`
const AddContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const AddBtn = styled.div`
    display: flex;
    height: 258px;
    padding: 90px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    position: relative;
    border-radius: 129px;
    background-color: #69D1DE;
    box-shadow: 0px 30px 60px 0px rgba(122, 127, 131, 0.20);
    cursor: pointer;
`
const PlusIcon = styled.img`
    width: 77px;
    height: 77px;
`;
const AddText = styled.div`
    color: #212121;
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    line-height: 110%;
    margin-top: 30px;
`

const ChoosePet = () => {
    //임시 데이터
    const pets = [
        {
          "petId": 1,
          "name": "밥무",
          "url": "img/filename2.jpg"
        },
        {
          "petId": 2,
          "name": "꼬순",
          "url": "img/filename1.jpg"
        },
      ]


      
    const navigate = useNavigate();
    return(
        <>
            <Navbar/>
            <MainContainer>
                <MainText>어떤 친구와의 추억을 돌아볼까요?</MainText>
                <SubText>돌아볼 친구의 프로필을 선택해주세요</SubText>
                <PetContainer>
                    {pets.map(pet => (
                        <PetCard key={pet.petId} name={pet.name} url={pet.url} onClick={() => {navigate(`/diary/${pet.petId}`)}}/>
                    ))}
                    <AddContainer>
                        <AddBtn onClick={() => {navigate('/register-pet');}}>
                            <PlusIcon src={plus}/>
                        </AddBtn>
                        <AddText>프로필 추가</AddText>
                    </AddContainer>    
                </PetContainer>
            </MainContainer>
        </>
    )
}

export default ChoosePet;