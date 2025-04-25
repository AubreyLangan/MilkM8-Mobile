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

const EventMilkCalculator = () => {
    const [eventDuration, setEventDuration] = useState("");
    const [feedingFrequency, setFeedingFrequency] = useState("");
    const [milkPerFeed, setMilkPerFeed] = useState("");
    const [result, setResult] = useState(null);

    const CalculateMilkForEvent = () => {
        const duration = parseFloat(eventDuration);
        const frequency = parseFloat(feedingFrequency);
        const perFeed = parseFloat(milkPerFeed);

        if (!duration || !frequency || !perFeed) {
            Alert.alert("Invalid Input", "Please fill in all fields with valid numbers.");
            return;
        }

        const feeds = Math.ceil(duration / frequency);
        const totalMilk = (feeds * perFeed).toFixed(1);
        setResult(totalMilk);
    };

    return (
        
    )
}