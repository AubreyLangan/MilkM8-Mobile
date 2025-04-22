import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    ScrollView,
    StyleSheet,
} from "react-native";

const WeaningCalculator = () => {
    const [currentSupply, setCurrentSupply] = useState("");
    const [goalSupply, setGoalSupply] = useState("");
    const [timeframe, setTimeframe] = useState("");
    const [schedule, setSchedule] = useState([]);

    const calculateWeaningSchedule = (current, goal, days) => {
        const totalDecrease = current - goal;
        const dailyDecrease = totalDecrease / days;

        const schedule = [];
        for (let i = 1; i <= days; i++) {
            const dailyAmount = Math.max(current - dailyDecrease * i, goal);
            schedule.push({ day: i, amount: dailyAmount.toFixed(2) });
        }

        return schedule;
    };

    const handleSubmit = () => {
        if (!currentSupply || !goalSupply || !timeframe) {
            Alert.alert("Missing fields", "Please fill in all fields.");
            return;
        }

        
    }
}