import React from 'react';
import styled from 'styled-components';
import plus from "../../assets/images/RegisterPet, ChoosePet, WriteDiary/plus.svg";

const UploadButton = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: 600px;
    aspect-ratio: 1 / 0.7; /* 가로 세로 비율 1:0.7 */
    border-radius: 15px;
    background-color: #E5E5EA;
    margin: 43px 0px 53px 0px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
`;
const ImageInput = styled.input`
    display: none;
`;
const PlusIcon = styled.img`
    width: 144px;
    height: 144px;
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

export const DiaryImageUpload = ({ image, setImage }) => {
    const response = {
        data: {
            url: "https://s3-alpha-sig.figma.com/img/8fcd/65d9/a4c3245bfdf0b26a01fb25d0f63a2469?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=J~XsnWk2x4fS6bogINT7r3jToFNSB32VG-pwBwlai-nGD5~lI~-HazNCKQdB7OcYU1~TLaYyyAI8lxfPcanilFNVrJHb4hsOKh2~8CmwZDTuK-xYB412F5Wuooz5nPM6Q1uaDi726QhttSG5Z0HHSB04g1bbcvfOgeEM6XKi3hqhfz7KCl9eoA9b7hw06wQReYl67kRYwP6a87BvELZ3QtkzzDn89D4Sf~rMBTgvi-3Z~ZBZh99n1bUMMIVN5TnXu7QCR0DwB~AF1pt-lpQl2dPIb6YWH~OmAnCXULSmLgroiU387YT5izqv-ePbX031DuCGStyZUAHvbZn6WSte~A__"
        }
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            // axios 코드
            setImage(response.data.url);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <UploadButton>
            <PlusIcon src={plus} $show={!image} />
            {image && <ImagePreview src={image} alt="Uploaded Image" />}
            <ImageInput type="file" accept="image/*" onChange={handleImageUpload} />
        </UploadButton>
    );
};

