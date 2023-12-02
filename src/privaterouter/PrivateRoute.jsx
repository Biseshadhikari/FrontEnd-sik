import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginContext } from '../context/UserContext';

function PrivateRoute({ component }) {
  const { isAuth } = useLoginContext();
  // console.log(typeof(isAuth))
  
  const navigate = useNavigate();
  useEffect(()=>{ 
    if (!isAuth){ 
      navigate("/login",{replace:true})
    }
  },[])

  // console.log(isAuth ===true)

  return (
    <div>
      {component}
    </div>
  );
}

export default PrivateRoute;
