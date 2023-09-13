import './App.css';
import SignUp from './Components/Signup';
import LogIn from './Components/Login';
import Admin from './Components/Admin';
import Home from './Components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='login' element={<LogIn />} />
        <Route path='admin' element={<Admin />} />
        <Route path='home' element={<Home />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
