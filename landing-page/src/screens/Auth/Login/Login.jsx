import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import AuthForm from '../components/AuthForm';
import './style.css';
import ROUTES from '../../../utils/routes';
import userService from '../../../services/user';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState("");

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await userService.login(formData.email, formData.password);
      if (response.accessToken) {
        navigate(ROUTES.ADMIN.DASHBOARD);
      }
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại. Vui lòng thử lại.");
    }
  };

  const loginFields = [
    {
      type: "email",
      name: "email",
      placeholder: "email@gmail.com",
      icon: <FiMail size={20} />,
    },
    {
      type: "password",
      name: "password",
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
      error={error}
    />
  );
};

export default LoginPage;
