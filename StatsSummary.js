import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StatsSummary= ({ entries }) => {
    const ozEntries = entries.filter((entry) => entry.unit === "oz");
    const mlEntries = entries.filter((entry) => entry.unit === "mL");

    const totalOz = ozEntries.reduce((sum, entry) => sum + parseFloat(entry.quantity), 0).toFixed(2);
    const averageOz = ozEntries.length > 0 ? (totalOz / ozEntries.length).toFixed(2) : 0;

    const totalMl = mlEntries.reduce((sum, entry) => sum + parseFloat(entry.quantity), 0).toFixed(2);
    const averageMl = mlEntries.length > 0 ? (totalMl / mlEntries.length).toFixed(2) : 0;

    return (
        <View style={StyleSheet.container}>
            <Text style={StyleSheet.header}>Summary</Text>

            {ozEntries.length > 0 && (
                <View style={StyleSheet.section}>
                    <Text style={StyleSheet.subHeader}>Ounces (oz)</Text>
                    <Text style={styles.text}>Total: {totalOz} oz</Text>
                    <Text style={styles.text}>Average: {averageOz} oz/session</Text>
                </View>
            )}

            {entries.length === 0 && <Text style={styles.text}>No data logged yet.</Text>}
        </View>
    );
};

