import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Memory from './pages/Memory';
import RegisterPet from './pages/RegisterPet';
import ChoosePet from './pages/ChoosePet';
import DiaryList from './pages/DiaryList';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/memory' element={<Memory/>}/>
      <Route path='/register-pet' element={<RegisterPet/>}/>
      <Route path='/diary' element={<ChoosePet/>}/>
      <Route path="/diary/pet:petId" element={<DiaryList />} />
    </Routes>
  );
}

export default App;
