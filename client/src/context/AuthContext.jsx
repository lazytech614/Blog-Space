import { createContext,useContext,useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({children}) => {
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails")) || null;
    const [authUser, setAuthUser] = useState(storedUserDetails);
    const [isSubscribed, setIsSubscribed] = useState(null);

    useEffect(() => {
        const checkSubscription = async () => {
            if (authUser) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/check-subscription/${authUser}`);
                    if (response.ok) {
                        const data = await response.json();
                        setIsSubscribed(data.isSubscribed);
                    } else {
                        setIsSubscribed(false); // or handle error appropriately
                    }
                } catch (error) {
                    console.error('Failed to check subscription:', error);
                }
            } else {
                setIsSubscribed(null); // reset if no user is authenticated
            }
        };

        checkSubscription();
    }, [authUser]);

    return <AuthContext.Provider value={{authUser, setAuthUser, isSubscribed, setIsSubscribed}}>
        {children}
    </AuthContext.Provider>
}