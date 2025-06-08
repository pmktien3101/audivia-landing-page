import React from 'react';
import './style.css';
import AuthForm from '../components';

const Register = () => {
  const handleRegister = (data) => {
    console.log('Register data:', data);
    // Implement your registration logic here (e.g., send data to an API)
    alert(`Registered with Email: ${data.email} and Password: ${data.password}`);
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register Screen</h1>
      <AuthForm isLogin={false} onSubmit={handleRegister} />
    </div>
  );
};

export default Register;
