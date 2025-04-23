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
        
    )
}