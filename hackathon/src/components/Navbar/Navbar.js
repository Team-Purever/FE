import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NavbarContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 13vh; // 140/1080 비율
    padding: 0px 50px;
`
const BrandText = styled.div`
    font-size: 32px;
    font-weight: 400;
    margin-right: 123px;
    cursor: pointer;
`
const MenuText = styled.div`
    padding: 14px 23px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
`
const MyProfileBtn = styled.div`
    width: 36px;
    height: 36px;
    margin-left: auto;
    background-color: black;
    border-radius: 50px;
    cursor: pointer;
`

export const Navbar = () => {
    const navigate = useNavigate();
    return(
        <NavbarContainer>
            <BrandText onClick={() => {navigate('/');}}>사이트 이름</BrandText>
            <MenuText onClick={() => {navigate('/memory');}}>추억하기</MenuText>
            <MenuText>장소 찾기</MenuText>
            <MyProfileBtn/>
        </NavbarContainer>
    );
}