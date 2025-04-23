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

        const calculatedSchedule = calculateWeaningSchedule(
            parseFloat(currentSupply),
            parseFloat(goalSupply),
            parseFloat(timeframe)
        );

        setSchedule(calculatedSchedule);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Weaning Calculator</Text>

            <Text style={styles.label}>Current Daily Supply (Oz):</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={currentSupply}
                onChangeText={setCurrentSupply}
                placeholder="e.g., 30"
            />

            <Text style={styles.label}>Goal Daily Supply</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={goalSupply}
                onChangeText={setGoalSupply}
                placeholder="e.g., 10"
            />

            <Text style={styles.label}>Timeframe (Days):</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={timeframe}
                onChangeText={setTimeframe}
                placeholder="e.g., 14"
            />

            <View style={styles.buttonCOntainer}>
                <Button title="Calculate" onPress={handleSubmit} />
            </View>

            {schedule.length > 0 && (
                <View style={styles.schedule}>
                    <Text style={styles.subtitle}>Weaning Schedule</Text>
                    {schedule.map((entry) => (
                        <Text key={entry.day} style={styles.scheduleItem}>
                            Day {entry.day}: {entry.amount} Oz
                        </Text>
                    ))}
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
    subtitle: {
        fontSize: 20,
        marginVertical: 10,
        fontWeight: "500",
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
    schedule: {
        marginTop: 30,
    },
    scheduleItem: {
        fontSize: 16,
        paddingVertical: 4,
    },
});

export default WeaningCalculator;