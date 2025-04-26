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
            <View style={styles.container}>
                <Text style={styles.thankYouTitle}>Thank You!</Text>
                <Text style={styles.thankYouMessage}>
                    Your feedback has been received. We appreciate your feedback!
                </Text>
            </View>
        );
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Feedback Form</Text>

            <TextInput
                style={styles.input}
                placeholder="Name (optional)"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Email (optional)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={feedbackType}
                    onValueChange={(itemValue) => setFeedbackType(itemValue)}
                >
                    <Picker.Item label="Bug Report" value="Bug Report" />
                    <Picker.Item label="Feature Request" value="Feature Request" />
                    <Picker.Item label="General Feedback" value="Feneral Feedback" />
                </Picker>
            </View>

            <TextInput 
                style={[styles.input, styles.textarea]}
                placeholder="Enter your feedback here..."
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={5}
            />

            <Button title="Submit Feedback" onPress={handleSubmit} />
        </ScrollView>
    );
};

    const styles = StyleSheet.create({
        container: {
            padding: 20,
            backgroundColor: "#fff",
            flexGrow: 1,
            justifyContent: "center",
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
        },
        thankYouTitle: {
           fontSize: 28,
           fontWeight: "bold",
           textAlign: "center",
           marginBottom: 10, 
        },
        thankYouMessage: {
            fontSize: 18,
            textAlign: "center",
            paddingHorizontal: 10,
        },
        input: {
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 12,
            borderRadius: 8,
            marginBottom: 15,
        },
        textarea: {
            height: 120,
            textAlignVertical: "top",
        },
        pickerContainer: {
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            marginBottom: 15,
            overflow: "hidden",
        },
    });

export default FeedbackForm;