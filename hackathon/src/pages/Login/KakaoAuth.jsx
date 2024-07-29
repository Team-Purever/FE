import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../api/index.js';

const KakaoAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
         // 백에 인가 코드를 보내서 토큰을 받아옴
        let code = new URL(window.location.href).searchParams.get('code');
        const response = await axiosInstance.post('/auth/signup/', {"platform": "kakao"}, {
            headers: {
                'Authorization': code
            }
        });
        console.log(response);
        // 토큰을 localstorage에 저장
        localStorage.setItem('access_token', response.data.accessToken);
        localStorage.setItem('refresh_token', response.data.refreshToken);
        // 로그인 완료 후 홈으로 이동
        navigate('/diary');
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <>
      <div>로그인 중 ...</div>
    </>
  );
};

export default KakaoAuth;