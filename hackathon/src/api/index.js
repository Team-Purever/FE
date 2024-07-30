import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
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
      localStorage.setItem('access_token', newAccessToken);
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