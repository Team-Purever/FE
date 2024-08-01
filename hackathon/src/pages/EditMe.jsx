import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Navbar } from '../components/Navbar/Navbar'; // 경로 수정
import dropdownIcon from '../assets/images/Mypage/dropdown.svg'; // 경로 수정
import { useNavigate } from 'react-router-dom'; 
import { axiosInstance } from '../api';
import { EditPet } from '../components/Edit/EditPet';

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
    width: 421px;
    margin-top: 100px;
`;

const Title = styled.h1`
    color: var(--kakao-logo, #000);
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    line-height: 110%;
    margin-bottom: 20px;
`;

const InputContainer = styled.div`
    display: flex;
    height: 66px;
    padding: 20px 49px;
    align-items: center;
    align-self: stretch;
    border-radius: 100px;
    border: 1px solid var(--grey4, #8D95A0);
    position: relative;

    &:focus-within {
        border: 1px solid var(--grey1, #212121);
    }
`;

const InputLabel = styled.span`
    color: #212121;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.2px;
    margin-right: 18px;
`;

const InputField = styled.input`
    border: none;
    outline: none;
    font-size: 16px;
`;

const InfoText = styled.div`
    color: #212121;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.2px;
    margin: 5px 0px 22px 0px
`;

const Blank = styled.div`
    height: 53px;
`
const SelectContainer = styled.div`
    width: 100%;
    height: 66px;
    position: relative;
    margin-bottom: 78px; /* 간격을 더 넓게 설정 */
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

const Select = styled.div`
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
    padding: 6px;
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
    position: absolute;
    top: 66px;
    left: 20px;
    right: 0;
    background: white;
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

const Button = styled.div`
    display: flex;
    padding: 24px 61px;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    background:  #69D1DE;
    cursor: pointer;

    color: white;
    font-size: 24px;
    font-weight: 700;
    line-height: 110%;

    &:hover {
        background-color: #5cc3d3;
    }
`;

const LogoutButton = styled(Button)`
    background-color: #ffffff;
    color: black;
    border: 2px solid #69d1de;

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
    margin: 11px 0px 42.5px 0px;
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

const ErrorText = styled.div`
    color: red;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.2px;
    margin: 5px 0px 0px 49px;
`

const EditMe = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [petData, setPetData] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [numberError, setNumberError] = useState(false);
    const [petId, setPetId] = useState(0);

    const navigate = useNavigate();

    // 펫 정보 수정 모달창
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // 펫 목록 드롭다운
    const handleDropdownClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionClick = (petId) => {
        setPetId(petId);
        
        openModal();
        setIsDropdownOpen(false);
    };

    // 사용자 정보 수정
    const updateUserInformation = async () => {
        let valid = true;
        if (!name) {
            setNameError(true);
            valid = false;
        } else {
            setNameError(false);
        }

        if(!email) {
            setEmailError(true);
            valid = false;
        } else {
            setEmailError(false);
        }

        if(!number) {
            setNumberError(true);
            valid = false;
        } else {
            setNumberError(false);
        }

        if(valid) {
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
        }
    };

    const fetchPetList = async () => {
        try{
            const accessToken = localStorage.getItem('access_token');

            const response = await axiosInstance.get('/pets', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            setPetData(response.data.data.Pets);
        } catch (error) {
            console.error(error);
        }
    }

    // 회원 탈퇴
    const deleteUserInformation = async () => {
        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await axiosInstance.delete('/auth/user/info', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            logout();
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    //로그아웃
    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/')
    }

    useEffect(() => {
        fetchPetList();
    }, []);

    return (
        <>
            <Navbar />
            <PageContainer>
                <FormContainer>
                    <Title>회원정보 수정</Title>
                    <InputContainer>
                        <InputLabel>이름</InputLabel>
                        <InputField type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    </InputContainer>
                    {nameError && <ErrorText>이름을 입력해주세요</ErrorText>}
                    <InfoText>* 1자 이상 10자 이내의 한글, 영문, 숫자 입력 가능합니다</InfoText>
                    <InputContainer>
                        <InputLabel>이메일</InputLabel>
                        <InputField type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </InputContainer>
                    {emailError && <ErrorText>이메일을 입력해주세요</ErrorText>}
                    <Blank/>
                    <InputContainer>
                        <InputLabel>휴대폰 번호</InputLabel>
                        <InputField type="text" value={number} onChange={(e) => setNumber(e.target.value)} />
                    </InputContainer>
                    {numberError && <ErrorText>번호를 입력해주세요</ErrorText>}
                    <DeleteAccountText onClick={deleteUserInformation}>회원 탈퇴하기</DeleteAccountText>
                    <SectionTitle>반려동물 관리</SectionTitle>
                    <SelectContainer onClick={handleDropdownClick}>
                        <Select readOnly>
                            <option value="">선택</option>
                        </Select>
                        {isDropdownOpen && (
                            <OptionList>
                                {petData && petData.map(pet => (
                                    <Option key={pet.petId} onClick={() => handleOptionClick(pet.petId)}>{pet.name}</Option>
                                ))}
                            </OptionList>
                        )}
                    </SelectContainer>
                    <ButtonContainer>
                        <Button onClick={updateUserInformation}>저장하기</Button>
                        <LogoutButton onClick={logout}>로그아웃</LogoutButton>
                    </ButtonContainer>
                </FormContainer>
                {isModalOpen && <EditPet petId={petId} onClose={closeModal} onSave={fetchPetList}/> }
            </PageContainer>
        </>
    );
};

export default EditMe;