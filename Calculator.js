import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    StyleSheet,
    ScrollView,
} from "react-native";

const MilkStashCalculator = () => {
    const [stash, setStash] = useState("");
    const [dailyConsumption, setDailyConsumption] = useState("");
    const [result, setResult] = useState(null);

    const calculateStashDuration = () => {
        const stashValue = parseFloat(stash);
        const consumptionValue = parseFloat(dailyConsumption);

        if (!stashValue || !consumptionValue || stashValue <= 0 || consumptionValue <= 0) {
            Alert.alert("Invalid Input", "Please enter valid numbers for both fields.")
            return;
        }

        const days = (stashValue / consumptionValue).toFixed(1);
        setResult(days);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Milk Stas Calculator</Text>

            <Text style={styles.label}>Total Milk in Stash (oz or ml):</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={stash}
                onChangeText={setStash}
                placeholder="Enter stash amount"
            />

            <Text style={styles.label}>Baby's Daily Consumption (oz or ml)</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={dailyConsumption}
                onChangeText={setDailyConsumption}
                placeholder="Enter daily consumption"
            />

            <View style={styles.buttonContainer}>
                <Button title="Calculate" onPress={calculateStashDuration} />
            </View>

            {result !== null && (
                <View style={styles.result}>
                    <Text style={styles.resultText}>
                        Your stash will last approximately <Text style={styles.strong}>{result}</Text> days.
                    </Text>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 20,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginTop: 5,
    },
    buttonContainer: {
        marginTop: 20,
    },
    result: {
        marginTop: 30,
        backgroundColor: "#f0f8ff",
        padding: 15,
        borderRadius:  8,
    },
    resultText: {
        fontSize: 16,
    },
    strong: {
        fontWeight: "bold",
    },
});

export default MilkStashCalculator;