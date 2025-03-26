import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TipsGenerator from "../components/TipsGenerator";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
import FeedStatistics from "../components/FeedStatistics";
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
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Stats")}>
                    <Text style={styles.buttonText}>View Stats</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigateDeprecated("FeedTracker")}>
                    <Text style={styles.buttonText}>Log a Feed</Text>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Recent Entries</Text>
                <FlatList
                    data={entries.slice(0, 3)}
                    keyExtractor={(entry) => entry.id}
                    renderItem={({ item }) => (
                        <Text style={styles.listItem}>
                            {item.date} - {item.quantity} {item.unit} ({item.notes || "No notes"})
                        </Text>
                    )}
                />

                <View style={styles.tips}>
                    <TipsGenerator />
                </View>

                <View style={styles.analytics}>
                    <AnalyticsDashboard />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
    title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
    subtitle: { fontSize: 16, textAlign: "center", marginBottom: 20 },
    summary: { marginBottom: 20 },
    statText: { fontSize: 16, marginBottom: 5 },
    bold: { fontWeight: "bold" },
    buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
    button: { backgroundColor: "#007AFF", padding: 10, borderRadius: 5, flex: 1, marginHorizontal: 5, alignItems: "center" },
    sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10},
    listItem: { fontSize: 16, padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
    tips: { marginTop: 20 },
    analytics: { marginTop: 20 },
});

export default HomeScreen;