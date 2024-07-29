import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import backgroundcat from '../assets/images/Login/backgroundcat.png';
import kakaoLogo from '../assets/images/Login/kakao.svg';
import naverLogo from '../assets/images/Login/naver.svg';
import googleLogo from '../assets/images/Login/google.svg';
import { Navbar } from "../components/Navbar/Navbar";

const BackgroundContainer = styled.div`
    background-image: url(${backgroundcat});
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
`;

const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgba(202, 202, 202, 0.30);
    backdrop-filter: blur(4px);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    color: white;
    text-align: center;
    position: relative;
    z-index: 1;
`;

const Title = styled.div`
    color: var(--kakao-logo, #000);
    text-align: center;
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: 110%; /* 44px */
    margin-bottom: 10px;
`;

const Subtitle = styled.div`
    color: var(--kakao-logo, #000);
    text-align: center;
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: 110%; /* 44px */
    margin-bottom: 20px;
`;

const SignupButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: flex-start; /* 왼쪽 정렬 */
    width: 441px;
    height: 78px;
    padding: 23px 37px;
    flex-direction: row;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 50px;
    border: 1px solid #FFF;
    background: rgba(233, 233, 233, 0.70);
    cursor: pointer;
    color: black;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 10px;

    &:hover {
        background-color: rgba(233, 233, 233, 0.85);
    }
`;

const Icon = styled.img`
    width: 32px;
    height: 32px;
`;

const Text = styled.span`
    flex: 1;
    text-align: center; /* 텍스트를 중앙에 배치 */
`;

const LoginLink = styled.div`
    margin-top: 20px;
    color: var(--kakao-logo, #373737);
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 24px */
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const NavbarWrapper = styled.div`
    position: relative;
    z-index: 2;
`;

const Signup = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login'); // 로그인 페이지로 이동
    };

    return (
        <>
            <NavbarWrapper>
                <Navbar />
            </NavbarWrapper>
            <BackgroundContainer />
            <Overlay />
            <Container>
                <Title>반가워요!</Title>
                <Subtitle>간편하게 가입하세요</Subtitle>
                <SignupButton>
                    <Icon src={kakaoLogo} alt="Kakao Logo" />
                    <Text>카카오로 가입하기</Text>
                </SignupButton>
                <SignupButton>
                    <Icon src={naverLogo} alt="Naver Logo" />
                    <Text>네이버로 가입하기</Text>
                </SignupButton>
                <SignupButton>
                    <Icon src={googleLogo} alt="Google Logo" />
                    <Text>구글로 가입하기</Text>
                </SignupButton>
                <LoginLink onClick={handleLogin}>이미 계정이 있으신가요? 로그인</LoginLink>
            </Container>
        </>
    );
};

export default Signup;