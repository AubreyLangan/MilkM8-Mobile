import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FeedDataContext = createContext();

export const useFeedData = () => useContext(FeedDataContext);

export const FeedDataProvider = ({ children }) => {
    const [feedData, setFeedData] = useState([]);
    const [milkStash, setMilkStash] = useState([]);

    useEffect(() => {
        loadStoredData();
    }, []);

    const loadStoredData = async () => {
        try {
            const storedFeedData = await AsyncStorage.getItem("feedData");
            const storedMilkStash = await AsyncStorage.getItem("milkStash");

            if (storedFeedData) setFeedData(JSON.parse(storedFeedData));
            if (storedMilkStash) setMilkStash(JSON.parse(storedMilkStash));
        } catch (error) {
            console.error("Failed to load data:", error);
        }
    };

    const saveToStorage = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Failed to save ${key}:`, error);
        }
    };

    const addFeedData = (entry) => {
        setFeedData((prevData) => {
            const updatedData = [...prevData, entry];
            saveToStorage("feedData", updatedData);
            return updatedData;
        });
    };

    const updateFeedData = (updatedEntry) => {
        setFeedData((prev) => {
            const updatedData = prev.map((entry) =>
            entry.id === updatedEntry.id ? updatedEntry : entry
            );
            saveToStorage("feedData", updatedData);
            return updatedData;
        });
    };

    const deleteFeedData = (id) => {
        setFeedData((prev) => {
            const updatedData = prev.filter((entry) => entry.id !== id);
            saveToStorage("feedData", updatedData);
            return updatedData;
        });
    };

    const addMilkStash = (entry) => {
        setMilkStash((prev) => {
            const updatedStash = [...prev, entry];
            saveToStorage("milkStash", updatedStash);
            return updatedStash;
        });
    };

    const updateMilkStash = (entry) => {
        setMilkStash((prev) => {
            const updatedStash = prev.map((item) =>
                item.id === entry.id ? entry : item
            );
            saveToStorage("milkStash", updatedStash);
            return updatedStash;
        });
    };

    const removeMilkStash = (id) => {
        setMilkStash((prev) => {
            const updatedStash = prev.filter((entry) => entry.id !== id);
            saveToStorage("milkStash", updatedStash);
            return updatedStash;
        });
    };

    return (
        <FeedDataContext.Provider
            value={{
                feedData,
                milkStash,
                addFeedData,
                updateFeedData,
                deleteFeedData,
                addMilkStash,
                removeMilkStash,
            }}
        >
            {children}
        </FeedDataContext.Provider>
    );
};

export default FeedDataProvider