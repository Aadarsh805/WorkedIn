import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Rooms from './Pages/Rooms';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/rooms' element={<Rooms/>} />
      <Route path='/me' element={<Profile/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
