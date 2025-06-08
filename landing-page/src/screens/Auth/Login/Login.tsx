import React from 'react';
import './style.css';
import AuthForm from '../components';

const Login = () => {
  const handleLogin = (data: any) => {
    console.log('Login data:', data);
    // Implement your login logic here (e.g., send data to an API)
    alert(`Logged in with Email: ${data.email} and Password: ${data.password}`);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login Screen</h1>
      <AuthForm isLogin={true} onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
