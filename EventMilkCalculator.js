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
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Event Milk Calculator</Text>

            <Text style={styles.label}>Event Duration (hours):</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={eventDuration}
                onChangeText={setEventDuration}
                placeholder="e.g., 4"
            />

            <Text style={styles.label}>Feeding Frequency (hours):</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={feedingFrequency}
                onChangeText={setFeedingFrequency}
                placeholder="e.g., 3"
            />

            <Text style={styles.label}>Milk per Feed (oz or ml):</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={milkPerFeed}
                onChangeText={setMilkPerFeed}
                placeholder="e.g. 4.5"
            />

            <View style={styles.buttonContainer}>
                <Button title="Calculate" onPress={CalculateMilkForEvent} />
            </View>

            {result !== null && (
                <View style={styles.resultBox}>
                    <Text style={styles.resultText}>
                        You will need approimately <Text style={styles.bold}>{result}</Text>
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
    resultBox: {
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

export default EventMilkCalculator;