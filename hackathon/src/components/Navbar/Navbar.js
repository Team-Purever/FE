import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/Navbar/PUREVER.svg'

const NavbarContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 13vh; // 140/1080 비율
    padding: 0px 50px;
`
const Logo = styled.img`
    width: 146.691px;
    height: 24.48px;
    cursor: pointer;
    margin-right: 107.31px;
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
    background-color: #69D1DE;
    border-radius: 50px;
    cursor: pointer;
`

export const Navbar = () => {
    const navigate = useNavigate();
    return(
        <NavbarContainer>
            <Logo src={logo} onClick={() => {navigate('/');}}/>
            <MenuText onClick={() => {navigate('/memory');}}>추억하기</MenuText>
            <MenuText>장소 찾기</MenuText>
            <MyProfileBtn/>
        </NavbarContainer>
    );
}