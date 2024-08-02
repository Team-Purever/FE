import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import closeBtn from "../../assets/images/DiaryList/closeBtn.svg"
import { useState, useEffect } from "react";
import { axiosInstance } from "../../api";

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(202, 202, 202, 0.30);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(17.5px);
    z-index: 1000;
`;

const ModalContainer = styled.div`
    display: flex;
    padding: 79px 78px;
    flex-direction: column;
    gap: 52px;
    flex-shrink: 0;
    background-color: white;
    border-radius: 52px;
    box-shadow: 0px 30px 60px 0px rgba(122, 127, 131, 0.20);
    position: relative;
    max-height: 85vh;
    overflow-y: auto;
`;
const CloseButton = styled.img`
    width: 25px;
    height: 25px;
    cursor: pointer;
    position: absolute;
    top: 35px; 
    right: 35px; 
`;
const PetItem = styled.div`
    display: flex;
    align-items: center;
    gap: 48px;
    cursor: pointer;
`;
const PetImage = styled.img`
    width: 170px;
    height: 170px;
    border-radius: 170px;
    box-shadow: 0px 30px 60px 0px rgba(122, 127, 131, 0.20);
    object-fit: cover;
`;
const PetNameAge = styled.div`
    display: flex;
    align-items: center;
`
const PetInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`
const PetName = styled.div`
    font-size: 32px;
    font-weight: 700;
`;
const PetAge = styled.div`
    color: #6E6E73;
    font-size: 32px;
    font-weight: 400;
`
const Line = styled.div`
    background-color: black;
    width: 2px;
    height: 28px;
    margin: 0px 13px;
`
const DateText = styled.div`
    color: #494B56;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.2px;
`

export const OtherPetModal = ({onClose}) => {
    const [pets, setPets] = useState([]);
    const navigate = useNavigate();

    // pet의 diary 정보를 가져와서 pets에 추가
    const fetchDiary = async (petsData) => {
        const accessToken = localStorage.getItem('access_token');
        for (const pet of petsData) {
            try {
                const diaryResponse = await axiosInstance.get(`/diaries/${pet.petId}/diary`,{
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                const diaries = diaryResponse.data.data.diaries;
                if (diaries && diaries.length > 0){
                    const firstDiary = diaries[diaries.length - 1];
                    const firstDate = new Date(firstDiary.created_at);
                    const today = new Date();
                    const timeSinceFirst = today-firstDate;
                    const daySinceFirst = Math.ceil(timeSinceFirst / (1000 * 60 * 60 * 24));
                    // pet에 date라는 프로퍼티 추가. 며칠 지났는지에 대한 정보.
                    pet.date = daySinceFirst;
                } else {
                    pet.date = 1;
                }
            } catch (error) {
                console.error(error);
            }
        }
        setPets([...petsData]);
    }

    const fetchData = async() => {
        try{
            const accessToken = localStorage.getItem('access_token');

            const petResponse = await axiosInstance.get('/pets',{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const petsData = petResponse.data.data.Pets;
            await fetchDiary(petsData)
            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=> {
        fetchData();
    }, []);

    const handlePetClick = (petId) => {
        navigate(`/diary/${petId}`);
        onClose();
    };

    return (
        <ModalOverlay>
            <ModalContainer>
                <CloseButton onClick={onClose} src={closeBtn}/>
                {pets.map(pet => (
                    <PetItem key={pet.petId} onClick={() => handlePetClick(pet.petId)}>
                        <PetImage src={pet.url} alt={pet.name} />
                        <PetInfoContainer>
                            <PetNameAge>
                                <PetName>{pet.name}</PetName>
                                <Line/>
                                <PetAge>{pet.age}살</PetAge>
                            </PetNameAge>
                            <DateText>추억 기록한지 {pet.date}일째</DateText>
                        </PetInfoContainer>
                    </PetItem>
                ))}
            </ModalContainer>
        </ModalOverlay>
    );
}