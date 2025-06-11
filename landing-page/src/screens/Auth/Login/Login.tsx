import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import './style.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted:", formData);
  };

  const loginFields = [
    {
      type: "email",
      name: "email",
      placeholder: "email@gmail.com",
      icon: "✉️",
      label: "Email"
    },
    {
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      icon: "🔒",
      label: "Password"
    }
  ];

  return (
    <AuthForm
      type="login"
      title="Welcome Back!!"
      fields={loginFields}
      formData={formData}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      submitButtonText="Login"
      showForgotPassword={true}
      showSocialLogin={true}
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      onFooterLinkClick={() => navigate('/register')}
      illustrationSrc="/login-illustration.png"
      illustrationAlt="Person working on laptop"
      layoutReverse={true}
      containerClassName="login-container"
    />
  );
};

export default LoginPage;
