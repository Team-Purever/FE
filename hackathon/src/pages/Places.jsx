import React, { useState } from 'react';
import styled from 'styled-components';
import { Navbar } from '../components/Navbar/Navbar';
import searchIcon from '../assets/images/Places/search.png';
import funeralIcon from '../assets/images/Places/funeral.png';
import hospeaceIcon from '../assets/images/Places/hospeace.png';
import mapIcon from '../assets/images/Places/map.svg';
import callIcon from '../assets/images/Places/call.svg';
import linkIcon from '../assets/images/Places/link.svg'; 
import dropdownIcon from '../assets/images/Places/dropdown1.svg';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { getPlaces } from '../api';
import { useEffect } from 'react';



const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Header = styled.h1`
    color: var(--kakao-logo, #000);
    text-align: center;
    font-family: Pretendard;
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: capitalize;
    margin-top: 20px;
`;

const SubHeader = styled.p`
    color: var(--grey-1, #212121);
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.2px;
    text-transform: capitalize;
    margin-bottom: 40px;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 50px;
`;

const FilterButton = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

img {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}
`;

const FilterIcon = styled.img`
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
`;

const InputContainer = styled.div`
    display: flex;
    width: 265px;
    height: 82px;
    padding: 23px 30px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 50px;
    border: 1px solid var(--grey5, #B9C0C8);
    background: #FFF;
    margin-bottom: 40px;
`;

const LocationInput = styled.input`
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    font-family: Pretendard;
`;

const PlacesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-bottom: 40px;
`;

const PlaceCard = styled.div`
    display: flex;
    width: 400px;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    padding: 20px;
`;

const PlaceImage = styled.div`
    height: 350px;
    align-self: stretch;
    border-radius: 20px;
    background: url(${props => props.imgUrl}) lightgray 0px -41.708px / 169.951% 113.022% no-repeat;
    box-shadow: 0px 30px 60px 0px rgba(122, 127, 131, 0.20);
`;

const PlaceName = styled.h3`
    display: flex;
    width: 374px;
    height: 30px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: var(--kakao-logo, #000);
    font-family: Pretendard;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: capitalize;
`;

const PlaceInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
`;

const PlaceIcon = styled.img`
    width: 24px;
    height: 24px;
    flex-shrink: 0;
`;

const PlaceText = styled.span`
    font-size: 14px;
    text-align: left;
`;

const StyledPagination = styled(Pagination)`
    .MuiPaginationItem-root {
        color: #697077;
        font-family: Roboto;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%; /* 20px */
        letter-spacing: 0.5px;
    }
    .MuiPaginationItem-root.Mui-selected {
        color: #ffffff;
        background-color: #69d1de;
    }
`;


const DropdownContainer = styled.div`
    display: flex;
    width: 250px;
    height: 80px;
    padding: 23px 30px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 50px;
    border: 1px solid var(--grey5, #B9C0C8);
    background: #FFF;
    margin-bottom: 40px;
    position: relative;
`;

const DropdownHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    cursor: pointer;
`;

const DropdownList = styled.ul`
    display: ${props => (props.isOpen ? 'block' : 'none')};
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    border: 1px solid var(--grey5, #B9C0C8);
    border-radius: 8px;
    background: #FFF;
    z-index: 1000;
`;

const DropdownListItem = styled.li`
    padding: 10px;
    list-style: none;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;


const Places = () => {
    const [placesData, setPlacesData] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('search');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState('시/도 선택');

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleSelectCity = (city) => {
        setSelectedCity(city);
        setIsOpen(false);
    };
    const fetchPlaces = async (city, category) => {
      try {
          const data = await getPlaces(city, category);
          setPlacesData(data.results.data);
      } catch (error) {
          console.error(error);
      }
  };

  useEffect(() => {
      fetchPlaces(selectedCity, selectedFilter);
  }, [selectedCity, selectedFilter]);

    /*const placesData = [
        {
            id: 1,
            name: '펫포유',
            address: '서울특별시 강남구 강남대로',
            number: '1533-4426',
            url: 'http://www.petforyou.kr',
            imgUrl: 'https://via.placeholder.com/300',
        },
        {
            id: 2,
            name: '펫포유',
            address: '서울특별시 강남구 강남대로',
            number: '1533-4426',
            url: 'http://www.petforyou.kr',
            imgUrl: 'https://via.placeholder.com/300',
        },
        {
            id: 3,
            name: '펫포유',
            address: '서울특별시 강남구 강남대로',
            number: '1533-4426',
            url: 'http://www.petforyou.kr',
            imgUrl: 'https://via.placeholder.com/300',
        },
        {
            id: 4,
            name: '펫포유',
            address: '서울특별시 강남구 강남대로',
            number: '1533-4426',
            url: 'http://www.petforyou.kr',
            imgUrl: 'https://via.placeholder.com/300',
        },
        {
            id: 5,
            name: '펫포유',
            address: '서울특별시 강남구 강남대로',
            number: '1533-4426',
            url: 'http://www.petforyou.kr',
            imgUrl: 'https://via.placeholder.com/300',
        },
        {
            id: 6,
            name: '펫포유',
            address: '서울특별시 강남구 강남대로',
            number: '1533-4426',
            url: 'http://www.petforyou.kr',
            imgUrl: 'https://via.placeholder.com/300',
        },
    ];
*/
    const cities = [
        '시/도 선택',
        '서울특별시',
        '인천광역시',
        '대전광역시',
        '광주광역시',
        '대구광역시',
        '울산광역시',
        '부산광역시',
        '경기도',
        '강원도',
        '충청북도',
        '충청남도',
        '전라북도',
        '전라남도',
        '경상북도',
        '경상남도',
        '제주특별자치도',
    ];

    return (
      <Container>
          <Navbar />
          <PageContainer>
              <Header>반려동물과의 따뜻한 배웅을 위한 장소</Header>
              <SubHeader>반려동물의 마지막 여정을 준비할 수 있는 웰다잉 관련 장소 정보를 찾아볼 수 있어요</SubHeader>
              <FilterContainer>
                  <FilterButton onClick={() => setSelectedFilter('search')}>
                      <FilterIcon src={searchIcon} alt="검색" />
                  </FilterButton>
                  <FilterButton onClick={() => setSelectedFilter('funeral')}>
                      <FilterIcon src={funeralIcon} alt="장례식장" />
                  </FilterButton>
                  <FilterButton onClick={() => setSelectedFilter('hospeace')}>
                      <FilterIcon src={hospeaceIcon} alt="호스피스" />
                  </FilterButton>
              </FilterContainer>
              <DropdownContainer>
                  <DropdownHeader onClick={toggleDropdown}>
                      {selectedCity}
                      <img src={dropdownIcon} alt="드롭다운" />
                  </DropdownHeader>
                  <DropdownList isOpen={isOpen}>
                      {cities.map((city) => (
                          <DropdownListItem key={city} onClick={() => handleSelectCity(city)}>
                              {city}
                          </DropdownListItem>
                      ))}
                  </DropdownList>
              </DropdownContainer>
              <PlacesContainer>
                  {placesData.map((place) => (
                      <PlaceCard key={place.id}>
                          <PlaceImage imgUrl={place.imgUrl} />
                          <PlaceName>{place.name}</PlaceName>
                          <PlaceInfo>
                              <PlaceIcon src={mapIcon} alt="주소 아이콘" />
                              <PlaceText>{place.address}</PlaceText>
                          </PlaceInfo>
                          <PlaceInfo>
                              <PlaceIcon src={callIcon} alt="전화 아이콘" />
                              <PlaceText>{place.number}</PlaceText>
                          </PlaceInfo>
                          <PlaceInfo>
                              <PlaceIcon src={linkIcon} alt="웹사이트 아이콘" />
                              <PlaceText><a href={place.url}>{place.url}</a></PlaceText>
                          </PlaceInfo>
                      </PlaceCard>
                  ))}
              </PlacesContainer>
              <Stack spacing={2}>
                  <StyledPagination count={10} />
              </Stack>
          </PageContainer>
      </Container>
  );
  };

  export default Places;
