import { useState } from "react"
import AuthForm from "../components/AuthForm"
import "./style.css"
import ROUTES from "../../../utils/routes"
import { useNavigate } from "react-router-dom"
import { FiLock, FiMail, FiUser } from "react-icons/fi"

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  })

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Register form submitted:", formData)
    // Xử lý logic đăng ký ở đây
  }

  const registerFields = [
    
    {
      name: "Username",
      type: "name",
      placeholder: "Nhập username",
      icon: <FiUser/>,
    },
    {
      name: "Email",
      type: "email",
      placeholder: "email@gmail.com",
      icon: <FiMail/>,
    },
    {
      name: "Password",
      type: "password",
      placeholder: "Nhập mật khẩu",
      icon: <FiLock/>,
    },
  ]

  return (
    <AuthForm
      type="register"
      title="Tạo tài khoản"
      fields={registerFields}
      formData={formData}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      submitButtonText="Tạo tài khoản"
      showForgotPassword={false}
      showSocialLogin={false}
      footerText="Bạn đã có tài khoản?"
      footerLinkText="Đăng nhập"
      onFooterLinkClick={() => navigate(ROUTES.LOGIN)}
      illustrationSrc="https://res.cloudinary.com/dgzn2ix8w/image/upload/v1748439988/Audivia/xxynw0hglztf4mijnobw.png"
      illustrationAlt="Person working on laptop for registration"
      layoutReverse={false}
      containerClassName="register-container"
    />
  )
}

export default RegisterPage
