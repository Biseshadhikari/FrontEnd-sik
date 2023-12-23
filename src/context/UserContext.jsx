import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import sikImage from '/home/bisesh/Desktop/Sikshyashala/frontend-sikshyashala/src/resources/sik.png';

const LoginContext = createContext();

export const useLoginContext = () => {
  return useContext(LoginContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showotp, setShowotp] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedIsAuth = localStorage.getItem('isAuth');

    if (storedIsAuth !== null && storedIsAuth !== undefined) {
      const isAuthBoolean = JSON.parse(storedIsAuth);
      setIsAuth(isAuthBoolean);
    }

    // Set loading state to false after checking isAuth
    setIsLoading(false);

    // Clear error message when navigating away
   
  }, [isLoading]);

  
  function clearLoginmessage(){ 
    setLoginErrorMessage('')
  }
  // useEffect(()=>{ 
  //   clearmessage()
  // },[])
  const register = async (email,username, password) => {
    if (email == "" || password == "" ||username == "")
    { 
      return
    }
    else{ 
      const response = await fetch('http://127.0.0.1:8000/user/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password,username:username }),
    });
    const data = await response.json();
    console.log(data)

    // if (data.success === true) {
    //   setIsAuth(true);
    //   const isAuth = true;
    //   localStorage.setItem('isAuth', JSON.stringify(isAuth));
    //   navigate('/');
    // } else {
    //   setLoginErrorMessage(data.message);
    // }

    }
    
  };
  const login = async (email, password) => {
    if (email == "" || password == "")
    { 
      return
    }
    else{ 
      const response = await fetch('http://127.0.0.1:8000/user/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();

    if (data.success === true) {
      setIsAuth(true);
      const isAuth = true;
      localStorage.setItem('isAuth', JSON.stringify(isAuth));
      navigate('/');
    } else {
      setLoginErrorMessage(data.message);
    }

    }
    
  };

  function logout() {
    setIsAuth(false);
    localStorage.removeItem('isAuth');
    navigate('/login');
  }

  const sendotp = async (email) => {
    const response = await fetch('http://127.0.0.1:8000/send-otp/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    });
    const data = await response.json();
    console.log(response);
    console.log(data)
    if (data.success === true) {
      setShowotp(true);
    }
    else{ 
      setLoginErrorMessage(data.message)
      // setIsLoading(false)
    }
  };

  const verify = async (email, otp, password) => {
    const response = await fetch('http://127.0.0.1:8000/verify-otp/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, otp: otp, newpassword: password }),
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      navigate('/');
    }
  };

  return (
    <LoginContext.Provider
      value={{
        login,
        isAuth,
        isLoading,
        sendotp,
        showotp,
        verify,
        logout,
        loginErrorMessage,
        clearLoginmessage,
        register
      }}
    >
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="spinner-border text-primary" role="status">
            <img src={sikImage} alt="" />
          </div>
        </div>
      ) : (
        children
      )}
    </LoginContext.Provider>
  );
};