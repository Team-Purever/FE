import styled from "styled-components"
import { useState, useEffect } from "react"
import pencil from "../../assets/images/DiaryInput/pencil.svg"

const Container = styled.div`
  position: relative;
`
const InputField = styled.textarea`
    width: 100%;
    height: 347px;
    min-width: 600px;
    position: relative;
    border-radius: 15px;
    border: 1px solid #B9C0C8;
    padding: 30px 40px;
    resize: none;
    &:focus {
        outline: none;
    }

    font-family: SUIT;
    font-size: 20px;
    font-weight: 500;
    line-height: 130%;
`
const InputTextContainer = styled.div`
    display: flex;
    gap: 30px;
    position: absolute;
    top: 30px;
    left: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${props => (props.$isFocused || props.$hasText ? '0' : '1')};
`
const PencilIcon = styled.img`
    width: 24px;
    height: 24px;
`
const InputText = styled.div`
    color: #8D95A0;
    font-size: 20px;
    font-weight: 500;
    line-height: 110%;
`
const CountText = styled.div`
    position: absolute;
    bottom: 30px;
    right: 40px;
    color: #6E6E73;
    font-size: 24px;
    font-weight: 700;
    line-height: 110%;
`

export const DiaryInput = ({value, onChange}) => {
    const [isFocused, setIsFocused] = useState(false); // 입력 필드가 포커스 되어있는지
    const [hasText, setHasText] = useState(false); // 입력 필드에 텍스트가 있는지

    // value에 값이 있는지 확인
    useEffect(() => {
        setHasText(value !== "");
    }, [value]);

    // 입력 필드가 포커스 될 때
    const handleFocus = () => {
        setIsFocused(true);
    };

    // 입력 필드가 포커스 아웃 될 때
    const handleBlur = (e) => {
        setIsFocused(false);
    };

    return(
        <Container>
            <InputField value={value} onChange={onChange} onFocus={handleFocus} onBlur={handleBlur} maxLength="150"/>
            <InputTextContainer $isFocused={isFocused} $hasText={hasText}>
                <PencilIcon src={pencil}/>
                <InputText>내용을 입력하세요.</InputText>
            </InputTextContainer>
            <CountText>{value.length}/150</CountText>
        </Container>
    );
}