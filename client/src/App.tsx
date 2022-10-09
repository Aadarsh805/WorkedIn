import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import Rooms from './Pages/Rooms';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/' element={<Home/>} />
      <Route path='/rooms' element={<Rooms/>} />
      <Route path='/me' element={<Profile/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
