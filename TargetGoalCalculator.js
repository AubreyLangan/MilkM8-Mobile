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
    </ScrollView>
)