import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Navbar } from "../components/Navbar/Navbar";
import { PetImageUpload } from '../components/RegisterPet/PetImageUpload';
import { axiosInstance } from '../api';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 87vh; // navbar 13vh 뺀 나머지
    min-height: 750px;
    justify-content: space-between;
    align-items: center;
`;
const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const MainText = styled.div`
    text-align: center;
    font-size: 48px;
    font-weight: 700;
    margin-top: 8vh;
`;
const InputBox = styled.div`
    display: flex;
    max-width: fit-content;
    height: 66px;
    padding: 20px 49px;
    align-items: center;
    border-radius: 100px;
    border: 1px solid #212121;
`;
const InputText = styled.div`
    color: #212121;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0.2px;
    margin-right: 18px;
`;
const Input = styled.input`
    border: none;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.2px;
    &:focus {
        outline: none;
    }
`;
const InfoText = styled.div`
    color: #212121;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.2px;
    margin: 11px 0px 22px 0px;
`;
const BtnContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 17px;
    margin-bottom: 12vh;
`;
const MintBtn = styled.div`
    padding: 24px 61px;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    background: #69D1DE;
    color: white;
    font-size: 24px;
    font-weight: 700;
    line-height: 110%;
    cursor: pointer;
`;
const WhiteBtn = styled.div`
    padding: 24px 61px;
    justify-content: center;
    align-items: center;
    border: 2px solid #69D1DE;
    border-radius: 100px;
    font-size: 24px;
    font-weight: 700;
    line-height: 110%;
    cursor: pointer;
`;

const RegisterPet = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);

    const submit = async() => {
        const petData = {
            name: name,
            age: parseInt(age),
            url: image
        };

        try{
            const accessToken = localStorage.getItem('access_token');
            const response = await axiosInstance.post('/pets', petData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const petId = response.data.data.petId;
            navigate(`/diary/${petId}`); // 반려동물 정보를 등록하면 해당 반려동물 추억일기장으로 이동

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <Navbar />
            <MainContainer>
                <MainText>추억을 함께 기록할 친구가 궁금해요</MainText>
                <PetImageUpload image={image} setImage={setImage} />
                <SubContainer>
                    <InputBox>
                        <InputText>이름</InputText>
                        <Input type='text' maxLength='10' value={name} onChange={(e) => setName(e.target.value)}/>
                    </InputBox>
                    <InfoText>* 1자 이상 10자 이내의 한글, 영문, 숫자 입력 가능합니다</InfoText>
                    <InputBox>
                        <InputText>나이</InputText>
                        <Input type='number' value={age} onChange={(e) => setAge(e.target.value)} />
                    </InputBox>
                </SubContainer>
                <BtnContainer>
                    <MintBtn onClick={submit}>기록하기</MintBtn>
                    <WhiteBtn onClick={() => { navigate('/diary'); }}>취소하기</WhiteBtn>
                </BtnContainer>
            </MainContainer>
        </>
    );
};

export default RegisterPet;
