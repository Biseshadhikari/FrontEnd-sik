// src/components/AuthForm.js
import React, { useEffect, useState } from 'react';
import { useLoginContext } from '../context/UserContext';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validate,setValidate] = useState({})
  const {register,registerComplete,loginmessae} = useLoginContext()
  // useEffect(()=>{ 
  //   const message = localStorage.getItem('message')
  // },[])
  
  // console.log(registerComplete)z
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {}
    if (email==""){ 
      data['email'] = "email required"
    }
    if (username==""){ 
      data['username'] = "username required"
    }
    if (password==""){ 
      data['password'] = "password required"
    }
    setValidate(data)
    // Add your authentication logic here
    register(username,email,password)
    
    
    
    
  };

  return (
    <div className="min-h-[95vh] flex items-center justify-center bg-gray-100">
      {registerComplete}
      <div className="bg-white p-8 rounded shadow-md w-full md:w-1/3">
        <h2 className="text-2xl font-semibold mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <h1>{loginmessae}</h1>
              {/* <h1 className='text-center mb-2 font-bold text-red-500'>{message}</h1> */}
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                
              />
              <p className='text-red-500 text-center'>{validate.username}</p>

              {/* <p className='text-red-500 text-center text-md'>{validate.username}</p> */}
            </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
            />
            <p className='text-red-500 text-center'>{validate.email}</p>

            {/* <p className='text-red-500 text-center text-md'>{validate.email}</p> */}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              
            />
            <p className='text-red-500 text-center'>{validate.password}</p>

            {/* <p className='text-red-500 text-center text-md'>{validate.password}</p> */}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
