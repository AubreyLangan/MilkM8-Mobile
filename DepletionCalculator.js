import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    ScrollView,
} from "react-native";

const DepletionCalculator = () => {
    const [stash, setStash] = useState("");
    const [dailyConsumption, setDailyConsumption] = useState("");
    const [result, setResult] = useState(null);

    const calculateDepletionDays = () => {
        const stashValue = parseFloat(stash);
        const consumptionValue = parseFloat(dailyConsumption);

        if (!stashValue || !consumptionValue || consumptionValue === 0) {
            Alert.alert("Invalid Input", "Please enter valid numbers for both fields.");
            return;
        }

        const days = (stashValue / consumptionValue).toFixed(1);
        setResult(days);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Days Until Depletion</Text>

            <Text style={styles.label}>Total Milk in Stash (oz or ml):</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={stash}
                onChangeText={setStash}
                placeholder="Enter stash amount"
            />

            <Text style={styles.label}>Baby's Daily Consumption (oz or ml):</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={dailyConsumption}
                onChangeText={setDailyConsumption}
                placeholder="Enter daily consumption"
            />

            <View style={styles.buttonContainer}>
                <Button title="Calculate" onPress={calculateDepletionDays} />
            </View>

            {result !== null && (
                <View style={styles.result}>
                    <Text style={styles.resultText}>
                        Your stash will last approximately <Text style={styles.bold}>{result}</Text>
                    </Text>
                </View>
            )}
        </ScrollView>
    );
};