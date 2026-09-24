import { createContext, useContext, useState, useEffect, useCallback } from "react";


import { BASE_URL  } from "../config/config";

const AuthContext = createContext(null);


export function AuthProvider ({ children}){

    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const refreshAuth = useCallback(async () =>{
        setLoading(true)



        try {
            const response = await fetch(`${BASE_URL}/api/auth/me`, {
                method:"GET",
                credentials:"include"
            });

            if (!response.ok){
                throw new Error(`Authentication check failes: ${response.status}`);
            }

            const data = await response.json();

            if (data.authenticated){
                setUser(data.user);
            } else {
                setUser(null)
            }
        } catch (error){
            console.error("Unable to check authentication:", error)
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() =>{
        
        refreshAuth();
    }, [refreshAuth]);

    const isAuthenticated = user !== null;

    return (
        <AuthContext.Provider 
        value={{ user, isAuthenticated, loading, refreshAuth,}}>
            { children }
        </AuthContext.Provider>
    );
}

export function useAuth(){

    const context = useContext(AuthContext);

    if (!context){
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context
}