import styled from "styled-components";
import background1 from '../assets/images/Home/background1.png'
import background2 from '../assets/images/Home/background2.png'
import image1 from '../assets/images/Home/image1.png'
import image2 from '../assets/images/Home/image2.png'
import Logo from '../assets/images/Navbar/PUREVER.svg'
import { Navbar } from "../components/Navbar/Navbar";
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from "../api/isLoggedIn";

const BackgroundImgContainer1 = styled.div`
    background-image: url(${background1});
    width: 100vw;
    height: 1080px;
    background-size: cover;
    background-position: center;
`
const TitleTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 35px;
    margin-right: 12%;
    margin-top: 120px;
`
const TitleText = styled.div`
    text-align: ${({ $align }) => ($align === 'left' ? 'left' : 'right')};
    font-size: 64px;
    font-weight: 800;
    line-height: 130%;
    letter-spacing: -0.64px;
`
const SubText = styled.div`
    text-align: right;
    font-size: 24px;
    font-weight: 500;
    line-height: 140%;
    letter-spacing: -0.24px;
`
const BackgroundColorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E8ECF1;
    width: 100vw;
` 
const IntroContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 125px 0px;
`
const MainText = styled.div`
    text-align: ${({ $align }) => ($align === 'left' ? 'left' : 'right')};
    font-size: 56px;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
    letter-spacing: -0.56px;
`
const ServiceInfoText = styled.div`
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.2px;
    text-transform: capitalize;
    margin: 22px 0px 45px 0px;
    line-height: 150%;
    color: #212121
`
const MintBtn = styled.div`
    display: flex;
    padding: 28px 40px;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    background-color: #69D1DE;
    cursor: pointer; 
    
    color: white;
    font-size: 24px;
    font-weight: 600;
    line-height: 110%;

    &:hover {
        background-color: #5cc3d3;
    }
`
const BackgroundContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 1430px;
    gap: 144px;
`
const FeatureInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 560px;
    gap: 51px;
`
const FeatureInfoText = styled.div`
    text-align: ${({ $align }) => ($align === 'left' ? 'left' : 'right')};
    color: #494B56;
    font-size: 24px;
    font-weight: 600;
    line-height: 36px;
    letter-spacing: 0.2px;
    text-transform: capitalize;
`
const ImgContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const Img = styled.img`
    width: 48%;
    min-width: 500px;
    box-shadow: 0px 30px 60px 0px rgba(122, 127, 131, 0.20);
    border-radius: 25px;
`
const ExpertContainer = styled.div` // 전체 컨테이너
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 78px;
    flex-shrink: 0;
    padding: 9% 10%;
`
const MintText = styled.span`
    color: #69D1DE;
`
const QuoteContainers = styled.div`
    display: flex;
    align-items: center;
    gap: 187px;
`
const Quote = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`
const DoctorText = styled.div`
    color: #6E6E73;
    font-feature-settings: 'clig' off, 'liga' off;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.46px;
`
const QuoteText = styled.div`
    color: #212121;
    font-feature-settings: 'clig' off, 'liga' off;
    font-size: 24px;
    font-weight: 500;
    letter-spacing: 0.46px;
    margin: 22px 0px 37px 0px;
`
const DetailText = styled.a`
    text-decoration-line: none;
    color: #494B56;
    font-feature-settings: 'clig' off, 'liga' off;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0.46px;
    cursor: pointer;
`
const BackgroundImgContainer2 = styled.div`
    background-image: url(${background2});
    width: 100vw;
    height: 607px;
    background-size: cover;
    background-position: center;
`
const LogoImg = styled.img`
    width: 270px;
    height: 45px;
    margin: 122px auto 116px auto;
`
const FooterContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 1083px;
`
const CompanyText = styled.div`
    color: #494B56;
    font-size: 16px;
    font-weight: 500;
    line-height: 28px;
    margin-left: auto;
`
const CopyrightText = styled.div`
    color: #6E6E73;
    font-size: 16px;
    font-weight: 400;
    line-height: 18px;
    margin-bottom: 88px;
`
const GreyLine = styled.hr`
    background: rgba(0, 0, 0, 0.32);
    margin: 18.5px 0px 18.5px 0px;
`
const Home = () => {
  const navigate = useNavigate(); // 페이지 이동을 위해 useNavigate 훅 추가

    const handleStartClick = () => { // 로그인 페이지로 이동하는 함수 추가
        const state = isLoggedIn();

        if(state)
            navigate('/memory'); // 로그인 되어있으면 추억하기 메인 페이지로 이동
        else
            navigate('/login'); // 로그인 안되어있으면 로그인 페이지로 이동
    };

    return(
        <>
        <BackgroundImgContainer1>
            <Navbar/>
            <TitleTextContainer>
                <TitleText $align='right'>반려동물과 행복한 안녕 <br/> 반려인의 안녕</TitleText>
                <SubText>다시 만날 수 있는 그날을 위해 행복하게 <br/> 작별 인사할 수 있도록 도와드릴게요</SubText>
            </TitleTextContainer>
        </BackgroundImgContainer1>


        <BackgroundColorContainer>
            <IntroContainer>
                <MainText>퓨레버가 행복한 안녕을 도울게요.</MainText>
                <ServiceInfoText>
                    반려동물을 사랑했던 순수한 마음을 영원히 간직할 수 있게 돕는다는 의미를 담은 이름처럼<br/>
                    웰빙(Well-being)만큼 중요한 반려동물의 웰다잉(well-dying) 준비를 돕습니다.
                </ServiceInfoText>
                <MintBtn onClick={handleStartClick}>지금 바로 시작하기</MintBtn> {/*로그인 여부에 따라 다른 페이지로 이동하도록 해야됨*/}
            </IntroContainer>
        </BackgroundColorContainer>


        <BackgroundContainer>
            <ImgContainer>
                <FeatureInfoContainer>
                    <MainText $align='left'>매일을 기록하며 <br/> 추억하세요</MainText>
                    <FeatureInfoText $align='left'>
                        매일 질문을 통해 행복했던 순간을 돌아봐요.<br/>
                        함께한 순간을 담은 사진과<br/>
                        그때의 감정을 기록하면서 마음껏 추억하세요.<br/>
                        <br></br>
                        세상에 단 하나밖에 없는 추억 일기장을 만들어 보세요.
                    </FeatureInfoText>
                </FeatureInfoContainer>
                <Img src={image1} alt="img1"/>
            </ImgContainer>
            <ImgContainer>
                <Img src={image2} alt="img2"/>
                <FeatureInfoContainer>
                    <MainText $align='right'>웰다잉을 위한 장소를 <br/> 찾아보세요</MainText>
                    <FeatureInfoText $align='right'>
                        전국 웰다잉 플레이스를 한번에 확인해요.<br/>
                        반려동물 장례식장과 호스피스 병원 정보를 통해<br/>
                        <br></br>
                        마지막 여정을 편안하게 마무리하도록 도와드릴게요.
                    </FeatureInfoText>
                </FeatureInfoContainer>
            </ImgContainer>
        </BackgroundContainer>


        <BackgroundColorContainer>
            <ExpertContainer>
                <TitleText $align='left'>힘껏 사랑하고 마음껏 행복하도록 <br/> <MintText>퓨레버</MintText>가 함께 도와드릴게요</TitleText>
                <QuoteContainers>
                    <Quote>
                        <DoctorText>정신과 전문의 이명수 원장</DoctorText>
                        <QuoteText>
                            “펫로스 증후군을 극복하기 위해서는<br/>
                            추억을 떠올리며 충분한<br/>
                            애도를 하는 것이 중요합니다.”<br/>
                        </QuoteText>
                        <DetailText href="https://www.mk.co.kr/news/it/10559989" target="_blank">자세히 알아보기</DetailText>
                    </Quote>
                    <Quote>
                        <DoctorText>설채현 수의사</DoctorText>
                        <QuoteText>
                            “후회없이 함께 행복하고, <br/>
                            반려동물이 세상을 떠난 후 <br/>
                            마음껏 슬퍼하세요.” <br/>
                        </QuoteText>
                        <DetailText href="https://www.hankyung.com/article/2024022718057" target="_blank">자세히 알아보기</DetailText>
                    </Quote>
                    <Quote>
                        <DoctorText>한국웰다잉문화운동 원혜영 대표</DoctorText>
                        <QuoteText>
                            “사람과 더불어 사는 동물의 웰다잉을 <br/>
                            위해서는 보호소 입양 때부터 장례에 <br/>
                            대한 교육을 더해...” <br/>
                        </QuoteText>
                        <DetailText href="https://www.hani.co.kr/arti/animalpeople/companion_animal/1027755.html" target="_blank">자세히 알아보기</DetailText>
                    </Quote>
                </QuoteContainers>
                <MintBtn onClick={handleStartClick}>지금 바로 시작하기</MintBtn> {/*로그인 여부에 따라 다른 페이지로 이동하도록 해야됨*/}
            </ExpertContainer>
        </BackgroundColorContainer>


        <BackgroundImgContainer2/>


        <BackgroundColorContainer>
            <FooterContainer>
                <LogoImg src={Logo}/>
                <CompanyText>홍익대학교 멋쟁이사자처럼 대학 12기 개발자국</CompanyText>
                <GreyLine/>
                <CopyrightText>Copyright © 2024 Likellion Hongik. All Rights Reserved.</CopyrightText>
            </FooterContainer>
        </BackgroundColorContainer>
        </>
    );
}

export default Home;