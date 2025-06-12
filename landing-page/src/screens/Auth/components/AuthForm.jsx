import React from 'react';

import { useState } from "react"
import "./style.css"
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

const FormInput = ({ type, placeholder, value, onChange, icon, label }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <div className="input-wrapper">
        <span className="input-icon">{icon}</span>
        <input
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="form-input"
        />
        {type === "password" && (
          <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FiEyeOff/> : <FiEye/>}
          </button>
        )}
      </div>
    </div>
  )
}

const AuthForm = ({
  title,
  fields,
  formData,
  onInputChange,
  onSubmit,
  submitButtonText,
  showForgotPassword = false,
  showSocialLogin = false,
  footerText,
  footerLinkText,
  onFooterLinkClick,
  illustrationSrc,
  illustrationAlt,
  layoutReverse = false,
  containerClassName = "",
}) => {
  return (
    <div className={`auth-container ${containerClassName}`}>
      <div className={`auth-content ${layoutReverse ? "login-layout" : ""}`}>
        <div className="illustration-section">
            <img src={illustrationSrc} alt={illustrationAlt} className="illustration-image" />
        </div>

        <div className="form-section">
          <div className="form-container">
            <h1 className="form-title">{title}</h1>

            <form onSubmit={onSubmit} className="auth-form">
              {fields.map((field, index) => (
                <FormInput
                  key={index}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={onInputChange(field.name)}
                  icon={field.icon}
                />
              ))}

              {showForgotPassword && (
                <div className="forgot-password">
                  <button type="button" className="link-button">
                    Quên nhập khẩu?
                  </button>
                </div>
              )}

              <button type="submit" className="submit-button">
                {submitButtonText}
              </button>
            </form>

            {showSocialLogin && (
              <>
                <div className="divider">
                  <span>Hoặc</span>
                </div>

                <div className="social-login">
                  <button type="button" className="social-button google">
                    <span className="social-icon"><FaGoogle size={20}/></span>
                  </button>
                  <button type="button" className="social-button facebook">
                    <span className="social-icon"><FaFacebook size={20}/></span>
                  </button>
                </div>
              </>
            )}

            <div className="form-footer">
              <span className="footer-text">
                {footerText}
                <button type="button" className="link-button" onClick={onFooterLinkClick}>
                  {footerLinkText}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
export { FormInput }
