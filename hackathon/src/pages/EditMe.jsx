import React, { useState } from 'react';
import styled from 'styled-components';
import { Navbar } from '../components/Navbar/Navbar'; // 경로 수정
import dropdownIcon from '../assets/images/Mypage/dropdown.svg'; // 경로 수정
import { useNavigate } from 'react-router-dom'; 
import { axiosInstance } from '../api';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #ffffff;
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    margin-top: 100px;
`;

const Title = styled.h1`
    color: var(--kakao-logo, #000);
    text-align: center;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 110%; /* 35.2px */
    margin-bottom: 20px;
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
    margin-bottom: 30px; /* 간격을 더 넓게 설정 */
    position: relative;

    &:focus-within {
        border: 1px solid var(--grey1, #212121);
    }
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
`;

const InfoText = styled.div`
    color: var(--grey1, #212121);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.2px;
    text-transform: capitalize;
    margin-bottom: 20px;
`;

const SelectContainer = styled.div`
    width: 100%;
    height: 66px;
    position: relative;
    margin-bottom: 30px; /* 간격을 더 넓게 설정 */
    border-radius: 100px;
    border: 1px solid var(--grey4, #8D95A0);
    display: flex;
    align-items: center;
    padding: 20px 49px;
    cursor: pointer;
    user-select: none;

    &:focus-within {
        border: 1px solid var(--grey1, #212121);
    }

    &::after {
        content: url(${dropdownIcon});
        position: absolute;
        right: 20px;
        pointer-events: none;
    }
`;

const Select = styled.select`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    appearance: none;
    font-size: 16px;
    background: transparent;
    padding-right: 40px; /* 드롭다운 아이콘과 텍스트가 겹치지 않도록 패딩 추가 */
    cursor: pointer;
`;

const OptionList = styled.div`
    display: flex;
    width: 316px;
    height: 120px;
    padding: 6px;
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
    position: absolute;
    top: 66px;
    left: 0;
    right: 0;
    background: var(--Neutral-colors-100, #FFF);
    border: 1px solid var(--grey5, #B9C0C8);
    border-radius: 8px;
    box-shadow: 0px 30px 60px 0px rgba(122, 127, 131, 0.20);
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
`;

const Option = styled.div`
    padding: 10px 20px;
    width: 100%;
    color: var(--grey2, #494B56);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    cursor: pointer;

    &:hover {
        font-weight: 700; /* 볼드 처리 */
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const Button = styled.button`
    width: 48%;
    height: 50px;
    background-color: #69d1de;
    border: none;
    border-radius: 25px;
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background-color: #5cc3d3;
    }
`;

const LogoutButton = styled(Button)`
    background-color: #ffffff;
    color: #69d1de;
    border: 1px solid #69d1de;

    &:hover {
        background-color: #f0f8fb;
    }
`;

const DeleteAccountText = styled.div`
    color: var(--grey2, #494B56);
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 100% */
    letter-spacing: 0.4px;
    margin-bottom: 30px;
    cursor: pointer;
`;

const SectionTitle = styled.h2`
    color: var(--kakao-logo, #000);
    text-align: center;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 110%; /* 35.2px */
    margin-bottom: 20px;
`;

const EditMe = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('선택');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');

    const navigate = useNavigate();

    const handleDropdownClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
        navigate('/edit-pet'); 
    };

    // 사용자 정보 수정
    const updateUserInformation = async () => {
        const userData = {
            name: name,
            email: email,
            number: number
        };
        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await axiosInstance.patch('/auth/user/info', userData, {
                headrs: {
                    Authorization: `Bearer ${accessToken}`
                }
        });

        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/')
    }

    return (
        <>
            <Navbar />
            <PageContainer>
                <FormContainer>
                    <Title>회원정보 수정</Title>
                    <InputContainer>
                        <InputLabel>이름</InputLabel>
                        <InputField type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)}/>
                    </InputContainer>
                    <InfoText>* 1자 이상 10자 이내의 한글, 영문, 숫자 입력 가능합니다</InfoText>
                    <InputContainer>
                        <InputLabel>이메일</InputLabel>
                        <InputField type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <InputLabel>휴대폰 번호</InputLabel>
                        <InputField type="text" placeholder="휴대폰 번호" value={number} onChange={(e) => setNumber(e.target.value)} />
                    </InputContainer>
                    <DeleteAccountText>회원 탈퇴하기</DeleteAccountText>
                    <SectionTitle>반려동물 관리</SectionTitle>
                    <SelectContainer onClick={handleDropdownClick}>
                        <Select value={selectedOption} readOnly>
                            <option value="">{selectedOption}</option>
                        </Select>
                        {isDropdownOpen && (
                            <OptionList>
                                <Option onClick={() => handleOptionClick('옵션 1')}>옵션 1</Option>
                                <Option onClick={() => handleOptionClick('옵션 2')}>옵션 2</Option>
                            </OptionList>
                        )}
                    </SelectContainer>
                    <ButtonContainer>
                        <Button onClick={updateUserInformation}>저장하기</Button>
                        <LogoutButton onClick={logout}>로그아웃</LogoutButton>
                    </ButtonContainer>
                </FormContainer>
            </PageContainer>
        </>
    );
};

export default EditMe;