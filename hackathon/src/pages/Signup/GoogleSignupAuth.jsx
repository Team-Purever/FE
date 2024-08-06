import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../api/index.js';

const GoogleSignupAuth = () => {
    const navigate = useNavigate();
    const isFetching = useRef(false);

    useEffect(() => {
      const fetchData = async () => {
        if (isFetching.current) return;  // 이미 요청 중이면 중단
        isFetching.current = true;
        
        try {
          // 백에 인가 코드를 보내서 토큰을 받아옴
          let code = new URL(window.location.href).searchParams.get('code');
          const response = await axiosInstance.post('/auth/signup/', {"platform": "google"}, {
            headers: {
              'Authorization': code
            }
          });
  
          // 토큰을 localstorage에 저장
          localStorage.setItem('access_token', response.data.data.accessToken);
          localStorage.setItem('refresh_token', response.data.data.refreshToken);
          
          // 로그인 완료 후 마이페이지로 이동
          navigate('/');
          
        } catch (e) {
          if (e.response && e.response.status === 500){
            alert('이미 가입된 회원입니다.');
            navigate('/login');
          } else {
            console.error(e);
          }
        } finally {
          isFetching.current = false;  // 요청이 완료되면 false로 재설정
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

export default GoogleSignupAuth;
