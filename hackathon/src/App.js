import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Memory from './pages/Memory';
import RegisterPet from './pages/RegisterPet';
import ChoosePet from './pages/ChoosePet';
import DiaryList from './pages/DiaryList';
import WriteDiary from './pages/WriteDiary';
import EditDiary from './pages/EditDiary';
import Login from './pages/Login';
import Signup from './pages/Signup';
<<<<<<< Updated upstream
import KakaoLoginAuth from './pages/Login/KakaoLoginAuth';
import NaverLoginAuth from './pages/Login/NaverLoginAuth';
import GoogleLoginAuth from './pages/Login/GoogleLoginAuth';
import KakaoSignupAuth from './pages/Signup/KakaoSignupAuth';
import NaverSignupAuth from './pages/Signup/NaverSignupAuth';
import GoogleSignupAuth from './pages/Signup/GoogleSignupAuth';
=======
import KakaoAuth from './pages/Login/KakaoAuth';
import EditMe from './pages/EditMe';
import EditPet from './pages/EditPet';
import Places from './pages/Places';
>>>>>>> Stashed changes


function App() {
  return (
    <>
<<<<<<< Updated upstream
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/memory' element={<Memory/>}/>
        <Route path='/register-pet' element={<RegisterPet/>}/>
        <Route path='/diary' element={<ChoosePet/>}/>
        <Route path='/diary/:petId' element={<DiaryList />} />
        <Route path='/diary/:petId/write' element={<WriteDiary/>}/>
        <Route path='/diary/:petId/edit' element={<EditDiary/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path='/auth/kakao' element={<KakaoLoginAuth/>}/>
        <Route path='/auth/naver' element={<NaverLoginAuth/>}/>
        <Route path='/auth/google' element={<GoogleLoginAuth/>}/>

        <Route path='/auth/kakao/signup' element={<KakaoSignupAuth/>}/>
        <Route path='/auth/naver/signup' element={<NaverSignupAuth/>}/>
        <Route path='/auth/google/signup' element={<GoogleSignupAuth/>}/>
      </Routes>
=======
    <ScrollToTop />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/memory' element={<Memory/>}/>
      <Route path='/register-pet' element={<RegisterPet/>}/>
      <Route path='/diary' element={<ChoosePet/>}/>
      <Route path='/diary/:petId' element={<DiaryList />} />
      <Route path='/diary/:petId/write' element={<WriteDiary/>}/>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/auth/kakao' element={<KakaoAuth/>}/>
      <Route path="/edit-me" element={<EditMe />} />
      <Route path="/edit-pet" element={<EditPet />} />
      <Route path="/places" element={<Places />} />
    </Routes>
>>>>>>> Stashed changes
    </>
  );
}

export default App;
