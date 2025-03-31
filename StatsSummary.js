import React from "react";
import { View, Text, StyleSheet, PermissionsAndroid } from "react-native";

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

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f8f8f8",
        borderRadius: 10,
        margin: 10,
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    section: {
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: "bold",
    },
    text: {
        fontSize: 16,
        color: "#555",
    },
});

export default StatsSummary;