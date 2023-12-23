
import React, { useEffect, useState } from 'react';
import { useLoginContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginErrorMessage,clearLoginmessage } = useLoginContext();
  const [validate,setValidate] = useState({
    "email":"",
    "password":""
  })

  const handleLogin = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const data = {}
    if (!emailRegex.test(email)){ 
      data.email = "Enter valid email type"
    }
    if (email == ""){ 
      data.email = "enter your email"
    }
    if (password == ""){ 
      data.password = "enter your password"
    }
    
    setValidate(data)
    
    login(email, password);
  };

  useEffect(()=>{ 
    setValidate({...validate,'email':""})
    clearLoginmessage()
  },[email])
  useEffect(()=>{ 
    setValidate({...validate,'password':""})
    clearLoginmessage()
  },[password])
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        {loginErrorMessage && (
        <p className="text-red-500 mb-4">{loginErrorMessage}</p>
        
        )
        }

        <form onSubmit={handleLogin} noValidate>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className='text-red-500'>{validate.email}</p>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className='text-red-500'>{validate.password}</p>
          </div>
          <p className="my-2 text-blue-500 hover:text-blue-900">
            <Link to="/reset">Forgot Password</Link>
          </p>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;