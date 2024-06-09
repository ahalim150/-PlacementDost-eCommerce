import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(false);

export default function AuthContextProvider({ children }){

    const [isLogIn, setIsLogIn] = useState(false);
    const [userData, setUserData] = useState();

    useEffect(()=>{
        try {
            setUserData(jwtDecode(localStorage.getItem("token")));
            setIsLogIn(true);
        } catch (error) {
            setIsLogIn(false);
            localStorage.removeItem("token");
        }
        
        window.addEventListener("storage", ()=>{
            try {
                jwtDecode(localStorage.getItem("token"));
                setIsLogIn(true);
            } catch (error) {
                setIsLogIn(false);
                localStorage.removeItem("token");
            }
        })
    }, [])

    return <AuthContext.Provider value={{isLogIn, setIsLogIn, userData}}>
        {children}
    </AuthContext.Provider>
}
