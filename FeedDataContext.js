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
}