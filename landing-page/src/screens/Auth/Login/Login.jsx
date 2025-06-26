import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import AuthForm from '../components/AuthForm';
import './style.css';
import ROUTES from '../../../utils/routes';
import userService from '../../../services/user';
import { jwtDecode } from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';
import useUser from '../../../hooks/useUser';

const LoginPage = () => {
  const user = useUser();
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
        const decodedToken = jwtDecode(response.accessToken);
        const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        if (role === "admin") {
          navigate(ROUTES.ADMIN.DASHBOARD);
        } else {
          navigate(ROUTES.HOME);
        }
      }
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại. Vui lòng thử lại.");
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      if (user != null) {
        userService.logout();
        alert("Bạn đã được đăng xuất khỏi tài khoản hiện tại để đăng nhập bằng Google.");;
      }

      const googleIdToken = credentialResponse.credential;

      if (!googleIdToken) {
        console.error("ID Token not found in Google credential response.");
        alert("Login failed: ID Token missing.");
        return;
      }

      const backendResponse = await userService.loginWithGoogle(googleIdToken);

      if (backendResponse.accessToken && backendResponse.refreshToken) {
        const decodedToken = jwtDecode(backendResponse.accessToken);
        const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        if (role === "admin") {
          navigate(ROUTES.ADMIN.DASHBOARD);
        } else {
          navigate(ROUTES.HOME);
        }
      } else {
        alert("Google login successful, but your server failed to issue app tokens.");
      }
    } catch (error) {
      console.error("Google login error:", error);
      alert(`An error occurred during Google login: ${error.message || error}`);
    }
  }

  const handleGoogleLoginError = (error) => {
    console.error("Google login failed:", error);
    alert(`Google login failed: ${error.error_description || error.message || error}`);
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
      onGoogleAuthSuccess={handleGoogleLoginSuccess}
      onGoogleAuthError={handleGoogleLoginError}
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
