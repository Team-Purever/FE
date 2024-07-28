import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Memory from './pages/Memory';
import RegisterPet from './pages/RegisterPet';
import ChoosePet from './pages/ChoosePet';
import DiaryList from './pages/DiaryList';
import WriteDiary from './pages/WriteDiary';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/memory' element={<Memory/>}/>
      <Route path='/register-pet' element={<RegisterPet/>}/>
      <Route path='/diary' element={<ChoosePet/>}/>
      <Route path='/diary/:petId' element={<DiaryList />} />
      <Route path='/diary/:petId/write' element={<WriteDiary/>}/>
    </Routes>
  );
}

export default App;
