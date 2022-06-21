import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Login from './pages/login';
import MainPage from './pages/mainpage';
import Senhas from './pages/senhas';
import Painel from './pages/painel';
import Caixa from './pages/caixa';





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
        <Route path="/senhas" element={<Senhas />} />
        <Route path="/painel" element={<Painel />} />
        <Route path="/caixa" element={<Caixa />} />
      </Routes>
    </BrowserRouter>
  );
}