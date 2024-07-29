import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Memory from './pages/Memory';
import RegisterPet from './pages/RegisterPet';
import ChoosePet from './pages/ChoosePet';
import DiaryList from './pages/DiaryList';
import WriteDiary from './pages/WriteDiary';
import Login from './pages/Login/Login';
import Signup from './pages/Signup';
import KakaoAuth from './pages/Login/KakaoAuth';


function App() {
  return (
    <>
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
    </Routes>
    </>
  );
}

export default App;
