import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Navbar } from "../components/Navbar/Navbar";
import plus from "../assets/images/RegisterPet, ChoosePet/plus.svg";

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 87vh; // navbar 13vh 뺀 나머지
    justify-content: space-between;
    align-items: center;
`
const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const MainText = styled.div`
    text-align: center;
    font-size: 48px;
    font-weight: 700;
    margin-top: 8vh;
`
const UploadButton = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22vh;
    height: 22vh;
    min-width: 200px;
    min-height: 200px;
    border-radius: 116.5px;
    background-color: #69D1DE;
    cursor: pointer;
    position: relative;
    overflow: hidden;
`;
const ImageInput = styled.input`
    display: none;
`;
const PlusIcon = styled.img`
    width: 70px;
    height: 70px;
    display: ${({ $show }) => ($show ? 'block' : 'none')};
`;
const ImagePreview = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
`;
const InputBox = styled.div`
    display: flex;
    max-width: fit-content;
    height: 66px;
    padding: 20px 49px;
    align-items: center;
    border-radius: 100px;
    border: 1px solid #212121;
`
const InputText = styled.div`
    color: #212121;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0.2px;
    margin-right: 18px;
`
const Input = styled.input`
    border: none;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.2px;
    &:focus {
        outline: none;
    }
`
const InfoText = styled.div`
    color: #212121;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.2px;
    margin: 11px 0px 22px 0px;
`
const BtnContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 17px;
    margin-bottom: 12vh;
`
const MintBtn = styled.div`
    padding: 24px 61px;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    background: #69D1DE;

    color: white;
    font-size: 24px;
    font-weight: 700;
    line-height: 110%;
    cursor: pointer;
`
const WhiteBtn = styled.div`
    padding: 24px 61px;
    justify-content: center;
    align-items: center;
    border: 2px solid #69D1DE;
    border-radius: 100px;

    font-size: 24px;
    font-weight: 700;
    line-height: 110%;
    cursor: pointer;
`
const RegisterPet = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) { // 파일이 선택되었는지 확인
            const reader = new FileReader(); // FileReader 객체 생성
            reader.readAsDataURL(file); // 파일 읽기 시작
            reader.onloadend = () => { // 파일 읽기가 완료되었을 때 발생하는 이벤트
                setImage(reader.result); // 읽은 파일의 내용을 image에 저장(URL)
            };
        }
    };

    return (
        <>
            <Navbar/>
            <MainContainer>
                <MainText>추억을 함께 기록할 친구가 궁금해요</MainText>
                <UploadButton>
                    <PlusIcon src={plus} $show={!image}/>
                    {image && <ImagePreview src={image} alt="Uploaded Image" />}
                    <ImageInput type="file" accept="image/*" onChange={handleImageUpload} />
                </UploadButton>
                <SubContainer>
                    <InputBox>
                        <InputText>이름</InputText>
                        <Input type='text' maxLength='10'/>
                    </InputBox>
                    <InfoText>* 1자 이상 10자 이내의 한글, 영문, 숫자 입력 가능합니다</InfoText>
                    <InputBox>
                        <InputText>나이</InputText>
                        <Input type='number'/>
                    </InputBox>
                </SubContainer>
                <BtnContainer>
                    <MintBtn>기록하기</MintBtn>
                    <WhiteBtn onClick={() => {navigate('/diary');}}>취소하기</WhiteBtn>
                </BtnContainer>
            </MainContainer>
        </>
    );
}

export default RegisterPet;