import { createContext, useContext, useState, useEffect } from "react";

export const FeedContext = createContext();

export const useFeedContext = () => {
    return useContext(FeedContext);
};

export const FeedContextProvider = ({ children }) => {
    const [feed, setFeed] = useState([]);

    useEffect(() => {
        const fetchFeed = async () => {
            try {   
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/blogs/all-blogs`).then((res) => res.json()).then((data) => setFeed(data.data));
            } catch (error) {
                console.error("Error fetching feed:", error);
            }
        };
        fetchFeed();
    }, []);

    return (
        <FeedContext.Provider value={{ feed, setFeed }}>
            {children}
        </FeedContext.Provider>
    );
}