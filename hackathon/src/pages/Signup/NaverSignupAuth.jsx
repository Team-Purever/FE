import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../api/index.js';

const NaverSignupAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        try {
           // 백에 인가 코드를 보내서 토큰을 받아옴
          let code = new URL(window.location.href).searchParams.get('code');
          const response = await axiosInstance.post('/auth/signup/', {"platform": "naver"}, {
            headers: {
              'Authorization': code
            }
          });
          console.log(response);
  
          // 토큰을 localstorage에 저장
          localStorage.setItem('access_token', response.data.data.accessToken);
          localStorage.setItem('refresh_token', response.data.data.refreshToken);
  
          // 로그인 완료 후 마이페이지로 이동
          navigate('/');
          
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, [navigate]);

    return (
        <>
        <div>회원가입 중 ...</div>
        </>
    );
};

export default NaverSignupAuth;
