import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import closeIcon from '../assets/images/Mypage/close.svg';
import { getPetInformation, updatePetInformation } from '../api';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: rgba(202, 202, 202, 0.30);
    backdrop-filter: blur(17.5px);
`;

const WhiteBox = styled.div`
    width: 663px;
    height: 700px;
    flex-shrink: 0;
    border-radius: 52px;
    background: #FFF;
    box-shadow: 0px 30px 60px 0px rgba(122, 127, 131, 0.20);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    position: relative;
`;

const CloseButton = styled.img`
    position: absolute;
    top: 20px;
    right: 20px;
    width: 24px;
    height: 24px;
    cursor: pointer;
`;

const ImageContainer = styled.div`
    width: 163px;
    height: 163px;
    flex-shrink: 0;
    border-radius: 163px;
    background: url(${props => props.imageUrl}) lightgray 50% / cover no-repeat;
    box-shadow: 0px 30px 60px 0px rgba(122, 127, 131, 0.20);
    margin-bottom: 20px;
`;

const EditImageText = styled.div`
    color: var(--grey2, #494B56);
    font-family: SUIT;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.2px;
    text-transform: capitalize;
    margin-bottom: 20px;
    cursor: pointer;
`;

const InputContainer = styled.div`
    display: flex;
    height: 66px;
    padding: 20px 49px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 100px;
    border: 1px solid var(--grey4, #8D95A0);
    margin-bottom: 20px;
`;

const InputLabel = styled.span`
    flex: 0 0 auto;
    width: 100px;
    font-size: 16px;
    color: #212121;
`;

const InputField = styled.input`
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
    font-family: Pretendard;
`;

const InfoText = styled.div`
    color: var(--grey1, #212121);
    font-family: SUIT;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.2px;
    text-transform: capitalize;
    margin-bottom: 20px;
`;

const DeletePetText = styled.div`
    color: var(--grey2, #494B56);
    text-align: center;
    font-family: SUIT;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 100% */
    letter-spacing: 0.4px;
    margin-bottom: 30px;
    cursor: pointer;
`;

const Button = styled.button`
    width: 200px;
    height: 50px;
    background-color: #69d1de;
    border: none;
    border-radius: 25px;
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background-color: #5cc3d3;
    }
`;

const EditPet = ({ petId }) => {
    const [petInfo, setPetInfo] = useState({ name: '', age: '' });
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPetInformation = async () => {
            try {
                const data = await getPetInformation(petId);
                setPetInfo({ name: data.name, age: data.age });
                setImageUrl(data.imageUrl);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPetInformation();
    }, [petId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPetInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updatePetInformation(petId, petInfo);
            navigate('/edit-me'); // EditMe 페이지로 이동
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <WhiteBox>
                <CloseButton src={closeIcon} onClick={() => navigate('/edit-me')} />
                <ImageContainer imageUrl={imageUrl} />
                <EditImageText>사진 편집</EditImageText>
                <InputContainer>
                    <InputLabel>이름</InputLabel>
                    <InputField
                        type="text"
                        name="name"
                        value={petInfo.name}
                        onChange={handleChange}
                        placeholder="이름"
                    />
                </InputContainer>
                <InfoText>* 1자 이상 10자 이내의 한글, 영문, 숫자 입력 가능합니다</InfoText>
                <InputContainer>
                    <InputLabel>나이</InputLabel>
                    <InputField
                        type="text"
                        name="age"
                        value={petInfo.age}
                        onChange={handleChange}
                        placeholder="나이"
                    />
                </InputContainer>
                <DeletePetText>반려동물 삭제하기</DeletePetText>
                <Button onClick={handleSubmit}>저장하기</Button>
            </WhiteBox>
        </Container>
    );
};

export default EditPet;