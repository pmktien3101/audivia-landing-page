import { useMemo, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const ROLE_KEY = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
const NAME_KEY = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
const EMAIL_KEY = 'email';
const USERID_KEY = 'userId';

export default function useUser() {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('accessToken'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return useMemo(() => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return {
        email: decoded[EMAIL_KEY],
        role: decoded[ROLE_KEY],
        name: decoded[NAME_KEY],
        userId: decoded[USERID_KEY],
        raw: decoded,
      };
    } catch (e) {
      return null;
    }
  }, [token]);
}
