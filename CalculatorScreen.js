import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useTheme } from "../utils/ThemeContext";

import DepletionCalculator from "../components/Calculators/DepletionCalculator";
import TargetGoalCalculator from "../components/Calculators/TargetGoalCalculator";
import MilkStashCalculator from "../components/Calculators/Calculator";
import EventMilkCalculator from "../components/Calculators/EventMilkCalculator";
import AverageProductionCalculator from "../components/Calculators/AverageProductionCalculator";
import WeaningCalculator from "../components/Calculators/WeaningCalculator";

const CalculatorScreen = () => {
    const { isDarkMode } = useTheme();

    const styles = getStyles(isDarkMode);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Milk Calculators</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Days until Depletion</Text>
                <DepletionCalculator />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Target Goal Calculator</Text>
                <TargetGoalCalculator />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Milk Stash Calculator</Text>
                <MilkStashCalculator />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Event Milk Calculator</Text>
                <EventMilkCalculator />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Average Production Calculator</Text>
                <AverageProductionCalculator />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Weaning Calculator</Text>
                <WeaningCalculator />
            </View>
        </ScrollView>
    );
};

const getStyles = (isDarkMode) =>
    StyleSheet.create({
        container: {
            padding: 16,
            backgroundColor: isDarkMode ? "#121212" : "#f9f9f9",
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            color: isDarkMode ? "#ffffff" : "#000000",
            marginBottom: 16,
        },
        section: {
            marginBottom: 24,
            padding: 12,
            backgroundColor: isDarkMode ? "#1f1f1f" : "#ffffff",
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: "600",
            marginBottom: 8,
            color: isDarkMode ? "#e0e0e0" : "#333333",
        },
    });

    export default CalculatorScreen;