export const isLoggedIn = () => {
    const token = localStorage.getItem('access_token');
    return !!token; // 토큰이 존재하면 true, 아니면 false 반환
};
  