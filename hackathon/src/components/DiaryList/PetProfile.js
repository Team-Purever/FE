import styled from "styled-components"

const ProfileContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 35px;
    margin-top: 67px;
`
const PetImage = styled.img`
    width: 141px;
    height: 141px;
    border-radius: 141px;
    object-fit: cover;
    box-shadow: 0px 30px 60px 0px rgba(122, 127, 131, 0.20);
    cursor: pointer;
`
const PetInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
`
const NameAgeContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 13px;
`
const NameText = styled.div`
    font-size: 32px;
    font-weight: 700;
`
const Line = styled.div`
    border-left: 2px solid black;
    height: 28px;
`
const AgeText = styled.div`
    color: #6E6E73;
    font-size: 32px;
    font-weight: 400;
`
const DateText = styled.div`
    color: #212121;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.2px;
`

export const PetProfile = ({url, age, name, day}) => {
    return(
        <ProfileContainer>
            <PetImage src={url}/>
            <PetInfoContainer>
                <NameAgeContainer>
                    <NameText>{name}</NameText>
                    <Line/>
                    <AgeText>{age}살</AgeText>
                </NameAgeContainer>
                <DateText>추억 기록한지 {day}일째</DateText>
            </PetInfoContainer>
        </ProfileContainer>
    )
}