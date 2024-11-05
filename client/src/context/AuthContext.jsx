import { createContext,useContext,useState, useEffect } from "react";
import useCheckSubscription from "../hooks/useCheckSubscription";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({children}) => {
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails")) || null;
    const [authUser, setAuthUser] = useState(storedUserDetails);
    const [isSubscribed, setIsSubscribed] = useState(null);

    const { checkSubscription } = useCheckSubscription();

    useEffect(() => {
        checkSubscription(authUser, setIsSubscribed);
    }, [authUser]);

    return <AuthContext.Provider value={{authUser, setAuthUser, isSubscribed, setIsSubscribed}}>
        {children}
    </AuthContext.Provider>
}