import { Routes, Route } from 'react-router-dom';
import Login from './login/login';
import Home from './home/home';
function App() {
  return (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
      </Routes>
  );
}
export default App
