import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MilkStashTracker from "../components/MilkStashTracker";

const HomeScreen = ({ entries = [] }) => {
    const navigation = useNavigation();
    const totalMilk = entries.reduce((total, entry) => total + Number(entry.quantity  || 0), 0);
    const lastEntry = entries[entries.length - 1] || {};

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to MilkM8</Text>
            <Text style={styles.subtitle}>Your trusted companion for tracking nursing and pumping sessions.</Text>

            <MilkStashTracker />

            <View style={styles.summary}>
                <FeedStatistics />
                <Text style={styles.statText}>
                    <Text style={styles.bold}>Total Milk Logged:</Text> {totalMilk.toFixed(2)} {lastEntry.time}
                </Text>
                {lastEntry.date && (
                    <Text style={styles.statText}>
                        <Text style={styles.bold}>Last Session:</Text> {lastEntry.date} at {lastEntry.time}
                    </Text>
                )}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("LogEntry")}>
                    <Text style={styles.buttonText}>Log a Session</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default HomeScreen;