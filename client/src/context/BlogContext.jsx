import { createContext, useContext, useState, useEffect } from "react";
import useGetAllBlogs from "../hooks/useGetAllBlogs";

export const FeedContext = createContext();

export const useFeedContext = () => {
    return useContext(FeedContext);
};

export const FeedContextProvider = ({ children }) => {
    const [feed, setFeed] = useState([]);
    const {fetchFeed} = useGetAllBlogs();

    useEffect(() => {
        fetchFeed(setFeed);
    }, []);

    return (
        <FeedContext.Provider value={{ feed, setFeed }}>
            {children}
        </FeedContext.Provider>
    );
}