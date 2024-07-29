import React from 'react';
import styled from 'styled-components';
import kakaoLogo from '../assets/images/Login/kakao.svg';

const KakaoButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: flex-start;
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
    text-align: center;
`;

const KakaoLogin = () => {
    const handleLogin = () => {
        const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
        window.location.href = kakaoURL;
    };

    return (
        <KakaoButton onClick={handleLogin}>
            <Icon src={kakaoLogo} alt="Kakao Logo" />
            <Text>카카오로 로그인</Text>
        </KakaoButton>
    );
};

export default KakaoLogin;