import { use } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
  const useInfo = use(AuthContext);
  return useInfo;
};

export default useAuth;
