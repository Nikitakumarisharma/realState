import { useEffect } from "react";
import {auth} from "../../firebase/firebase_config"
import { onAuthStateChanged } from "firebase/auth";

import { useContext } from "react";

const AuthContext= React.createContext();

export function useAuth
(){
  return useContext(AuthContext);
}
export function AuthProvider({children}){
  const [curruser, setCurrUser]=useState(null);
  const [userLogIn, setUserLogIn]=useState(false);
  const [loading, setLoading]=useState(true);

  useEffect(()=>{
      const unSubscribe= onAuthStateChanged(auth,initializeUser);
      return unSubscribe;
  },[])

  async function initializeUser(user) {
    if(user){
      setCurrUser({...user});
      setUserLogIn(true);
    }
    else{
      setCurrUser(null);
      setUserLogIn(false);
    }
    setLoading(false);
  }
  const value= {
    curruser,
    userLogIn,
    loading
  }
  return(
    <AuthContext.Provider value={value}>
    {!loading && children}
    </AuthContext.Provider>
  )
}