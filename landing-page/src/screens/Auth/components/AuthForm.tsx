import React from 'react';
import './style.css';

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (data: any) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin, onSubmit }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    onSubmit({ email, password });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">
        {isLogin ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

export default AuthForm;
