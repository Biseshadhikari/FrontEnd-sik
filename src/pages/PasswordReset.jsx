import React, { useEffect, useState } from 'react';
import { useLoginContext } from '../context/UserContext';
const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [validate,setValidate] = useState({})
  const {sendotp,showotp,message,verify,errorMessage,clearLoginmessage} = useLoginContext()
  const [ispending,setIspending] = useState(true)
  
  useEffect(()=>{ 
    setIspending(prev=>!prev)
  },[showotp])
  useEffect(()=>{ 
    clearLoginmessage()
  },[])

  const handleReset = async (e) => {
    e.preventDefault();
    const data = {}
    if (email == ""){ 
      setValidate({...validate,['email']:"enter your email"})
      return
    }
    setIspending(prev=>!prev)

    sendotp(email)

  }
  const handleOtp = async (e) => {
    e.preventDefault();
    const data = {}
    if (otp == ""){ 
      setValidate({...validate,'otp':"enter your otp"})
    }
    if (password == ""){ 
      setValidate({...validate,'passowrd':"enter your password"})
    }
    console.log(otp)
    console.log(password)
    verify(email,otp,password)
    

  }
  
  return (
<div className="min-h-auto p-5 min-h-[95vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-1/3">
        {!ispending && <p className='text-xl text-center font-bold'>loading....</p>}
        <h2 className="text-2xl font-semibold mb-6">Reset</h2>
       
        {showotp?(
          
          <form onSubmit={handleOtp}>
            <p className='text-center text-xl p-3 bg-gray-100 rounded-xl  mb-3 text-green-500'>Otp sent to {email}</p>
              <div className="mb-4">
          <label  className="block text-gray-700 text-sm font-bold mb-2">Otp:</label>
          <p className='text-red-500 text-center font-bold'>{validate.otp}</p>          
          <input
            type="text"
            id="otp"
            className="w-full p-2 border mt-2 mb-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            
          />
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">New Password:</label>
          {/* {message&&<p className= "text-red-500 text-sm text-center">{message}</p>} */}
          <input
            type="password"
            id="otp"
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
          <p className='text-red-500 text-center font-bold'>{validate.password}</p>          

          <button
              type="submit"
              className="bg-blue-500 mt-2 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              reset
          </button>
          
          </div>
          </form>
          
        ):(
          <form onSubmit={handleReset}>
              {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                {message&&<p className= "text-red-500 text-sm text-center">{message}</p>}
                <input
                  type="email"
                  id="email"
                  className={`w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ${showotp?"border-2 border-green-600":""}`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly ={showotp}
                />
                <p className='text-red-500 text-center font-bold'>{validate.email}</p>          

                  <button
                  type="submit"
                  className="bg-blue-500 mt-2 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Send
                  </button>
                
                
              </div>
      
          </form>
         
          
        )}
        
      </div>
    </div>
  );
};

export default PasswordReset;
