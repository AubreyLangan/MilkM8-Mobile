import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Picker, ScrollView, Alert } from "react-native";

const FeedbackForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [feedbackType, setFeedbackType] = useState("Bug Report");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (!message.trim()) {
            Alert.alert("Validation Error", "Please provide your feedback before submitting.");
            return;
        }

        const feedbackData = {
            name,
            email,
            feedbackType,
            message,
            date: new Date().toISOString(),
        };

        console.log("Feedback submitted:", feedbackData);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            
        )
    }
}