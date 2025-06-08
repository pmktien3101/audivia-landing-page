import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './screens/LandingPage'
import AuthForm from './screens/Auth/components/AuthForm';

const handleAuthSubmit = (data) => {
  console.log('Auth data:', data);
  // Add your authentication logic here
};

createRoot(document.getElementById('desktop')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/login" element={<AuthForm isLogin={true} onSubmit={handleAuthSubmit} />} />
        <Route path="/auth/register" element={<AuthForm isLogin={false} onSubmit={handleAuthSubmit} />} />
      </Routes>
    </Router>
  </StrictMode>,
)
