import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import AuthForm from '../components/AuthForm';
import './style.css';
import ROUTES from '../../../utils/routes';

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
      name: "Email",
      placeholder: "email@gmail.com",
      icon: <FiMail size={20} />,
    },
    {
      type: "password",
      name: "Password",
      placeholder: "Nhập mật khẩu",
      icon: <FiLock size={20} />,
    }
  ];

  return (
    <AuthForm
      type="login"
      title="Đăng nhập"
      fields={loginFields}
      formData={formData}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      submitButtonText="Đăng nhập"
      showForgotPassword={true}
      showSocialLogin={true}
      footerText="Bạn không có tài khoản?"
      footerLinkText="Đăng ký"
      onFooterLinkClick={() => navigate(ROUTES.REGISTER)}
      illustrationSrc="https://res.cloudinary.com/dgzn2ix8w/image/upload/v1748432785/Audivia/mwxl1jfedjmj7lc0luth.png"
      illustrationAlt="Person working on laptop"
      layoutReverse={true}
      containerClassName="login-container"
    />
  );
};

export default LoginPage;
