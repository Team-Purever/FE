import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import closeIcon from '../../assets/images/Mypage/close.svg';
import { axiosInstance } from '../../api';

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
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
    top: 35px;
    right: 35px;
    width: 24px;
    height: 24px;
    cursor: pointer;
`;

const ImageContainer = styled.img`
    width: 163px;
    height: 163px;
    flex-shrink: 0;
    border-radius: 163px;
    box-shadow: 0px 30px 60px 0px rgba(122, 127, 131, 0.20);
    margin-bottom: 20px;
    object-fit: cover;
`;

const EditImageText = styled.label`
    color: var(--grey2, #494B56);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.2px;
    text-transform: capitalize;
    cursor: pointer;
`;

const FileInput = styled.input`
    display: none;
`;

const InputContainer = styled.div`
    display: flex;
    height: 66px;
    padding: 20px 49px;
    align-items: center;
    gap: 10px;
    border-radius: 100px;
    border: 1px solid var(--grey4, #8D95A0);
    margin-top: 25px;
`;

const InputLabel = styled.span`
    color: #494B56;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.2px;
`;

const InputField = styled.input`
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
`;

const InfoText = styled.div`
    color: #212121;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.2px;
    margin-top: 11px;
`;

const DeletePetText = styled.div`
    color: var(--grey2, #494B56);
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 100% */
    letter-spacing: 0.4px;
    margin-top: 18.5px;
    cursor: pointer;
`;

const Button = styled.button`
    display: flex;
    padding: 24px 61px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: none;
    border-radius: 100px;
    background-color: #69D1DE;
    margin-top: 25px;

    color: white;
    font-family: SUIT;
    font-size: 24px;
    font-weight: 700;
    line-height: 110%;
    cursor: pointer;

    &:hover {
        background-color: #5cc3d3;
    }
`;

const ErrorText = styled.div`
    color: red;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.2px;
    margin-top: 11px;
`

const isValidName = (name) => {
    const regex = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9\s]+$/;
    return regex.test(name);
};

export const EditPet = ({petId, onClose, onSave}) => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [nameError, setNameError] = useState(false);
    const [ageError, setAgeError] = useState(false);

    const handleNameChange = (e) => {
        const inputValue = e.target.value;
        if(isValidName(inputValue) || inputValue === '')
            setName(inputValue);
    }

    const fetchData = async () => {
        try {
            const accessToken = localStorage.getItem('access_token');

            const response = await axiosInstance.get(`/pets/${petId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setImage(response.data.data.pet.url);
            setName(response.data.data.pet.name);
            setAge(response.data.data.pet.age);
        } catch (error) {
            console.error(error);
        }
    }

    const handleImageUpload = async(event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('url', file);

        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await axiosInstance.post('/pets/img', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            setImage(`http://ec2-43-201-159-179.ap-northeast-2.compute.amazonaws.com${response.data.data.url}`);

        } catch (error) {
            console.error(error);
        }
    };

    const deletePet = async() => {
        const accessToken = localStorage.getItem('access_token');
        try {
            const response = await axiosInstance.delete(`/pets/${petId}`,{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            onSave();
        } catch (error) {
            console.log(error);
        }
    }

    const submit = async() => {
        let valid = true;
        if (!name) {
            setNameError(true);
            valid = false;
        } else {
            setNameError(false);
        }

        if (!age) {
            setAgeError(true);
            valid = false;
        } else {
            setAgeError(false);
        }
        
        if(valid) {
            const petData = {
                name: name,
                age: parseInt(age),
                url: image
            };

            try {
                const accessToken = localStorage.getItem('access_token');
                const response = await axiosInstance.patch(`/pets/${petId}`, petData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                onSave();
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container>
            <WhiteBox>
                <CloseButton src={closeIcon} onClick={onClose} />
                <ImageContainer src={image}/>
                <EditImageText htmlFor='file-input'>사진 편집</EditImageText>
                <FileInput
                    id='file-input'
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                />
                <InputContainer>
                    <InputLabel>이름</InputLabel>
                    <InputField
                        type="text"
                        maxLength='10'
                        value={name}
                        onChange={handleNameChange}
                    />
                </InputContainer>
                {nameError && <ErrorText>이름을 알려주세요</ErrorText>}
                <InfoText>* 1자 이상 10자 이내의 한글, 영문, 숫자 입력 가능합니다</InfoText>
                <InputContainer>
                    <InputLabel>나이</InputLabel>
                    <InputField
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </InputContainer>
                {ageError && <ErrorText>나이를 알려주세요</ErrorText>}
                <DeletePetText onClick={deletePet}>반려동물 삭제하기</DeletePetText>
                <InfoText>* 반려동물 계정 삭제 시 추억 기록 복구가 불가능합니다</InfoText>
                <Button onClick={submit}>저장하기</Button>
            </WhiteBox>
        </Container>
    );
};