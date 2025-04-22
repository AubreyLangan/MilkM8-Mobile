import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AverageProductionCalculator = ({ entries = [] }) => {
    if (entries.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.info}>No entires available for calculation.</Text>
            </View>
        );
    }

    const totalMilk = entries.reduce((sum, entry) => sum + parseFloat(entry.quantity || 0), 0);
    const averageMilk = (totalMilk / entries.length).toFixed(1);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Average Milk Production Calculator</Text>
            <Text style={styles.result}>
                Your average production is <Text style={styles.bold}>{averageMilk}</Text> oz/ml per session.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },
    result: {
        fontSize: 16,
    },
    bold: {
        fontWeight: "bold",
        color: "#0288d1",
    },
    info: {
        fontSize: 16,
        color: "#888",
    },
});

export default AverageProductionCalculator;