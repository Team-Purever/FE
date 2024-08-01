import React from 'react';
import styled from 'styled-components';
import plus from "../../assets/images/RegisterPet, ChoosePet, WriteDiary/plus.svg";
import { axiosInstance } from '../../api';

const UploadButton = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: 600px;
    aspect-ratio: 1 / 0.7; /* 가로 세로 비율 1:0.7 */
    border-radius: 15px;
    background-color: #E5E5EA;
    margin-top: 43px;
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

    const handleImageUpload = async(event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('url', file);

        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await axiosInstance.post('/diaries/pets/img/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            setImage(`http://ec2-43-201-159-179.ap-northeast-2.compute.amazonaws.com${response.data.data.url}`);

        } catch (error) {
            console.error(error);
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

