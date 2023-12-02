import { createContext ,useState,useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "./UserContext";
const postcontext = createContext()

export const usePostContext = ()=>{ 
    return useContext(postcontext)
}
export const PostProvider = ({children})=>{ 
    // useEffect(()=>{ 
    //     getCourse()
    // })
    
    return ( 
        <postcontext.Provider value = {{}}>
            {children}
        </postcontext.Provider>
    )
}