import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Memory from './pages/Memory';
import RegisterPet from './pages/RegisterPet';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/memory' element={<Memory/>}/>
      <Route path='/register-pet' element={<RegisterPet/>}/>
    </Routes>
  );
}

export default App;
