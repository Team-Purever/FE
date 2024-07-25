import styled from 'styled-components';
import background from '../assets/Memory/background.png'
import { Navbar } from "../components/Navbar/Navbar";

const BackgroundContainer = styled.div`
    background-image: url(${background});
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: center;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 9.4%;
    margin-top: 190px;
`
const MainText = styled.div`
    font-size: 64px;
    font-weight: 800;
    line-height: 110%;
    letter-spacing: -0.64px;
`
const SubText = styled.div`
    font-size: 20px;
    font-weight: 400;
    line-height: 140%;
    margin-top: 20px;
`
const MintBtn = styled.div`
    display: inline-flex;
    max-width: fit-content;
    margin-top: 41px;
    padding: 23px 35px;
    justify-content: center;
    align-items: center;
    border-radius: 47px;
    background-color: #69D1DE;
    cursor: pointer;

    color: white;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
`
const Memory = () => {
    return(
        <BackgroundContainer>
            <Navbar/>
            <Container>
                <MainText>행복한 기억들을 <br/> 추억하세요</MainText>
                <SubText>
                    하루하루 다르게 주어지는 질문들에 답하며 <br/>
                    사랑하는 반려동물과의 추억들을 되돌아 보세요.
                </SubText>
                <MintBtn>추억 일기장</MintBtn>
            </Container>
        </BackgroundContainer>
    );   
}
export default Memory;