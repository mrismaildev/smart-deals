import axios from 'axios';
import useAuth from './useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const instance = axios.create({
  baseURL: 'https://smart-deals-server-projects.vercel.app',
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      async config => {
        //currentUser er moddhe [prototype er moddhe getIdToken thake]
        const token = await user?.getIdToken();
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }

        return config;
      },
    );

    // const responsInterceptor = instance.interceptors.response.use(
    //   res => {
    //     return res;
    //   },
    //   err => {
    //     const status = err.status;
    //     if (status === 401 || status === 403) {
    //       console.log('log out the user for the bad request');
    //       signOutUser().then(() => {
    //         //navigate user to the login page
    //         navigate('/register');
    //       });
    //     }
    //   },
    // );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      // instance.interceptors.response.eject(responsInterceptor);
    };
  }, [user, signOutUser, navigate]);

  return instance;
};

export default useAxiosSecure;
