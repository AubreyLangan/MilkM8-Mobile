import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StatsSummary from "../components/StatsSummary";
import { useTheme } from "../utils/ThemeContext";

const StatsScreen = ({ entries = [] }) => {
    const totalMilk = entries.reduce((total, entry) => {
        const quantity = parseFloat(entry.quantity);
        return total + (isNaN(quantity) ? 0 : quantity);
    }, 0);

    const { isDarkMode } = useTheme();

    const unit = entries.length > 0 ? entries[0].unit : "oz";

    return (
        <View style={[styles.container, isDarkMode ? styles.dark : styles.light]}>
            <Text style={[styles.title, isDarkMode && styles.darkText]}>Statistics</Text>
            <Text style={[styles.totalText, isDarkMode && styles.darkText]}>
                Total Milk Logged: {totalMilk.toFixed(2)} {unit}
            </Text>
            <StatsSummary entries={entries} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        
    }
})