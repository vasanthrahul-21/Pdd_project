import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import LoginForm from './components/LoginForm';  // Ensure correct filename casing
import DriverSignup from './components/DriverSignup';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginForm" element={<LoginForm />}></Route>
        <Route path="/DriverSignup" element={<DriverSignup/> }></Route>
        <Route path="/DriverSignup" element={<DriverSignup/> }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
