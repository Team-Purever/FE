import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import closeBtn from "../../assets/images/DiaryList/closeBtn.svg"

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
    justify-content: center;
    align-items: center;
    gap: 52px;
    flex-shrink: 0;
    background-color: white;
    border-radius: 52px;
    box-shadow: 0px 30px 60px 0px rgba(122, 127, 131, 0.20);
    position: relative;
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
const PetInfoContainer = styled.div`
    display: flex;
    align-items: center;
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

export const OtherPetModal = ({onClose}) => {
    const pets = [
        { petId: 1, name: "밥무", age: 3, url: "img/filename2.jpg" },
        { petId: 2, name: "꼬순", age: 4, url: "img/filename1.jpg" },
    ];

    const navigate = useNavigate();

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
                            <PetName>{pet.name}</PetName>
                            <Line/>
                            <PetAge>{pet.age}살</PetAge>
                        </PetInfoContainer>
                    </PetItem>
                ))}
            </ModalContainer>
        </ModalOverlay>
    );
}