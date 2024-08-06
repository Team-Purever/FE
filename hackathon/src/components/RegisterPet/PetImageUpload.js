import styled from 'styled-components';
import plus from "../../assets/images/RegisterPet, ChoosePet, WriteDiary/plus.svg";
import { axiosInstance } from '../../api';

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

export const PetImageUpload = ({image, setImage}) => {

    const handleImageUpload = async(event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('url', file);

        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await axiosInstance.post('/pets/img', formData, {
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
            <PlusIcon src={plus} $show={!image} /> {/*이미지가 등록되었으면 + 아이콘 안보이게*/}
            {image && <ImagePreview src={image} alt="Uploaded Image" />} {/*이미지가 등록되었으면 미리보기로 보여줌*/}
            <ImageInput type="file" accept="image/*" onChange={handleImageUpload} />
        </UploadButton>
    );
};
