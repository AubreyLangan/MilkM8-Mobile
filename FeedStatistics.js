import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFeedData } from "../contexts/FeedDataContext";
import { calculateFeedStatistics } from "../utils/CalculateFeedStatistics";

const FeedStatistics = () => {
    const { feedData } = useFeedData();
    const stats = calculateFeedStatistics(feedData);

    const totalFeeds = Object.values(stats).reduce(
        (total, { count }) => total + count,
        0
    );
}