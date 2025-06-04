import { useAuth } from '@auth/context/AuthContext';
import { useEffect } from 'react';

const useAuthEffect = (callback, deps = []) => {
  const { isAuthenticated, needs2FA } = useAuth();

  useEffect(() => {
    if (isAuthenticated && needs2FA === false) {
      return callback();
    }
  }, [isAuthenticated, needs2FA, ...deps]);
};

export default useAuthEffect;
