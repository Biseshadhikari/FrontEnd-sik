import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useLoginContext } from '../context/UserContext'
function PrivateRouteAuth({component}) {
    const { isAuth } = useLoginContext();
    // console.log(typeof(isAuth))
    
    const navigate = useNavigate();
    useEffect(()=>{ 
      if (isAuth){ 
        navigate("/",{replace:true})
      }
    },[])
  
    // console.log(isAuth ===true)
  
    return (
      <div>
        {component}
      </div>
    );
}


export default PrivateRouteAuth
