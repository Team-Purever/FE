import styled from "styled-components";

const PetCardContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const PetImage = styled.img`
    width: 258px;
    height: 258px;
    border-radius: 258px;
    object-fit: cover;
    box-shadow: 0px 30px 60px 0px rgba(122, 127, 131, 0.20);
    cursor: pointer;
`
const PetName = styled.div`
    color: #212121;
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    line-height: 110%;
    margin-top: 30px;
`

export const PetCard = ({name, url, onClick}) => {
    return(
        <PetCardContainer onClick={onClick}>
            <PetImage src={url} alt={name} />
            <PetName>{name}</PetName>
        </PetCardContainer>
    )   
} 