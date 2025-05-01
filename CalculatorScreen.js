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

