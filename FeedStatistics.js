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

    const totalAmount = Object.values(stats).reduce(
        (total, { totalAmount }) => total + totalAmount,
        0
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Feed Statistics</Text>

            <FlatList
                data={Object.keys(stats)}
                keyExtractor={(feedType) => feedType}
                renderItem={({ item: feedType }) => (
                    <View style={styles.statItem}>
                        <Text style={styles.feedType}>{feedType}</Text>
                        <Text style={styles.statText}>
                            Total Amount: {stats[feedType].totalAmount.toFixed(1)} Oz
                        </Text>
                        <Text style={styles.statText}>
                            Number of Feeds: {stats[feedType].count}
                        </Text>
                    </View>
                )}
            />

            <View style={styles.summary}>
                <Text style={styles.summaryTitle}>Total Summary:</Text>
                <Text style={styles.statText}>Total Feeds: {totalFeeds}</Text>
                <Text style={styles.statText}>Total Amount: {totalAmount.toFixed(1)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        flex: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    statItem: {
        backgroundColor: "#f9f9f9",
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    feedType: {
        fontSize: 18,
        fontWeight: "bold",
    },
    statText: {
        fontSize: 16,
    },
    summary: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#e3f2fd",
        borderRadius: 5,
    },
    summaryTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default FeedStatistics;