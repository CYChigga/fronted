import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/login';
import { Register } from './pages/register';

export default function App() {
  return (
    // 路由配置
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
