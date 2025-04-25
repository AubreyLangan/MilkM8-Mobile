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

    const TargetGoalCalculator = () => {
        const [targetDays, setTargetDays] = useState("");
        const [dailyConsumption, setDailyConsumption] = useState("");
        const [stash, setStash] = useState("");
        const [result, setResult] = useState(null);
    
    const calculateMilkForTargetGoal = () => {
        const days = parseFloat(targetDays);
        const daily = parseFloat(dailyConsumption);
        const stashAmount = parseFloat(stash);

        if (!days || !daily || stashAmount === null || isNaN(stashAmount)) {
            Alert.alert("Invalid Input", "Please enter valid numbers for all fields.");
            return;
        }

    
        const requiredMilk = days * daily;
        const additionalMilk = Math.max(0, requiredMilk - stashAmount).toFixed(1);
        setResult(additionalMilk);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Target Goal Calculator</Text>


            <Text style={styles.label}>Target Days:</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={targetDays}
                onChangeText={setTargetDays}
                placeholder="Enter number of days"
            />

            <Text style={styles.label}>Baby's Daily Consumption (oz or ml):</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={dailyConsumption}
                onChangeText={setDailyConsumption}
                placeholder="Enter daily consumption"
            />

            <Text style={styles.label}>Current Stash (oz or ml):</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={stash}
                onChangeText={setStash}
                placeholder="Enter current stash"
            />

            <View style={styles.buttonContainer}>
                <Button title="Calculate" onPress={calculateMilkForTargetGoal} />
            </View>

            {result !== null && (
                <View style={styles.result}>'
                    <Text style={styles.resultText}>
                        You need an additional <Text style={styles.bold}>{result}</Text> oz/ml to meet your target goal. 
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
        borderRadius: 8,
    },
    resultText: {
        fontSize: 16,
    },
    bold: {
        fontWeight: "bold",
    },
});

export default TargetGoalCalculator;