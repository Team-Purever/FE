import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://ec2-43-201-159-179.ap-northeast-2.compute.amazonaws.com",
    headers: {
      'Content-Type': 'application/json',
    }
});

// 토큰 재발급 함수
const reissueToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      console.error('리프레시 토큰이 없습니다');
      return null;
    }
  
    try {
      const response = await axiosInstance.get('/auth/reissue', {
        headers: {
            refreshToken: `Bearer ${refreshToken}`
        }
      });
      console.log('토큰 재발급 완료');
      const newAccessToken = response.data.data.accessToken;
      const newRefreshToken = response.data.data.refreshToken;
      localStorage.setItem('access_token', newAccessToken);
      localStorage.setItem('refresh_token', newRefreshToken);
      return newAccessToken;

    } catch (error) {
      console.error(error);
      return null;
    }
};

// Axios 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      // 401 응답일 때
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newAccessToken = await reissueToken(); // 토큰 재발급 시도
        if (newAccessToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest); // 재발급된 토큰으로 원래 요청 재시도
        }
      }
  
      return Promise.reject(error); // 에러 반환
    }
);

// 반려동물 정보 조회 함수
export const getPetInformation = async (petId) => {
  try {
      const response = await axiosInstance.get(`/pets/${petId}`);
      return response.data;
  } catch (error) {
      console.error(error);
      throw error;
  }
};

// 반려동물 정보 수정 함수
export const updatePetInformation = async (petId, data) => {
  try {
      const response = await axiosInstance.patch(`/pets/${petId}`, data);
      return response.data;
  } catch (error) {
      console.error(error);
      throw error;
  }
};

// 사용자 정보 조회 함수
export const getUserInformation = async () => {
  try {
      const response = await axiosInstance.get('/auth/user/info');
      return response.data;
  } catch (error) {
      console.error(error);
      throw error;
  }
};

// 사용자 정보 수정 함수
export const updateUserInformation = async (data) => {
  try {
      const response = await axiosInstance.patch('/auth/user/info', data);
      return response.data;
  } catch (error) {
      console.error(error);
      throw error;
  }
};

// 사용자 계정 삭제 함수 (회원 탈퇴)
export const deleteUserAccount = async () => {
  try {
      const response = await axiosInstance.delete('/auth/user');
      return response.data;
  } catch (error) {
      console.error(error);
      throw error;
  }
};

// 장소 정보 조회 함수
export const getPlaces = async (city, category, page) => {
  try {
    const params = { city, page };
    if (category) {
      params.category = category;
    }
    const accessToken = localStorage.getItem('access_token');
    const response = await axiosInstance.get('/places', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};