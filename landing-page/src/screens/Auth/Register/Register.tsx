import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import './style.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    phone: "",
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
    console.log("Register form submitted:", formData);
  };

  const registerFields = [
    {
      name: "email",
      type: "email",
      placeholder: "email@gmail.com",
      icon: "✉️",
      label: "Email",
    },
    {
      name: "phone",
      type: "tel",
      placeholder: "Enter your phone no",
      icon: "📱",
      label: "Phone no",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      icon: "🔒",
      label: "Password",
    },
  ];

  return (
    <AuthForm
      type="register"
      title="Create Account"
      fields={registerFields}
      formData={formData}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      submitButtonText="Create Account"
      showForgotPassword={false}
      showSocialLogin={false}
      footerText="Already have an account?"
      footerLinkText="Sign in"
      onFooterLinkClick={() => navigate('/login')}
      illustrationSrc="/register-illustration.png"
      illustrationAlt="Person working on laptop for registration"
      layoutReverse={false}
      containerClassName="register-container"
    />
  );
};

export default RegisterPage; 