import { useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';

const ROLE_KEY = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
const NAME_KEY = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
const EMAIL_KEY = 'email';
const USERID_KEY = 'userId';

export default function useUser() {
  return useMemo(() => {
    const token = localStorage.getItem('accessToken');
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
  }, []);
}
