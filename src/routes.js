import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Login from './pages/login';
import MainPage from './pages/mainpage';


/*

const PrivateRoute = ({ component: Component }) => {
  return localStorage.getItem('@token') ?
    <Component />
    :
    <Navigate to={"/"} replace />
}

*/

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mainPage" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}