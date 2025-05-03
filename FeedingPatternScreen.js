import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    ScrollView,
    StyleSheet,
    Alert,
    Platform,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const screenWidth = Dimensions.get("window").width;

const FeedingPatternScreen = () => {
    const [interval, setInterval] = useState(3);
    const [feedings, setFeedings] = useState(generateFeedingData(3));

    function generateFeedingData(interval) {
        const data = [];
        let currentTime = 0;
        for (let i = 0; i < 8; i++) {
            if (currentTime >= 24) break;
            data.push({ time: `${currentTime}:00`, feed: 1 });
            currentTime += interval;
        }
        return data;
    }

    const handleGeneratePattern = () => {
        setFeedings(generateFeedingData(interval));
    };

    const handleReset = () => {
        setInterval(3);
        setFeedings(generateFeedingData(3));
    };

    const handleExportCSV = async () => {
        const csvContent = [
            ["Time", "Feed"],
            ...feedings.map((row) => [row.time, row.feed]),
        ]
            .map((e) => e.join(","))
            .join("\n");

        const path = FileSystem.documentDirectory + "feeding-pattern.csv";
        await FileSystem.writeAsStringAsync(path, csvContent, {
            encoding: FileSystem.EncodingType.UTF8,
        });

        await Sharing.shareAsync(path);
    };

    const chartData = {
        labels: feedings.map((f) => f.time),
        datasets: [
            {
                data: feedings.map((f) => f.feed),
                color: () => "#6c63ff",
                strokeWidth: 2,
            },
        ],
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Feeding Pattern Generator</Text>
            <Text style={styles.description}>
                Genreate a visual feeding pattern based on your preferred time interval. 
            </Text>

            <Text style={styles.label}>Set Feeding Interval (hours):</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={interval.toString()}
                onChangeText={(text) => {
                    const val = parseInt(text, 10);
                    if (!isNaN(val) && val > 0 && val <= 12) setInterval(val);
                }}
            />

            <View style={styles.buttonGroup}>
                <Button title="Generate Patterns" onPress={handleGeneratePattern} />
                <Button title="Reset to Default" onPress={handleReset} />
                {Platform.OS !== "web" && (
                    <Button title="Export CSV" onPress={handleExportCSV} />
                )}
            </View>

            <LineChart
                data={chartData}
                width={screenWidth - 40}
                height={220}
                chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#f7f7f7",
                    backgroundGradientTo: "e0e0e0",
                    decimalPlaces: 0,
                    color: () => "#6c663ff",
                    labelColor: () => "#333",
                    style: { borderRadius: 16 },
                    propsForDots: { r: "6", strokeWidth: "2", stroke: "#6c63ff" },
                }}
                bezier
                style={{ marginVertical: 20, borderRadius: 16 }}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        width: "100%",
    },
    buttonGroup: {
        gap: 10,
        marginBottom: 20,
    },
});

export default FeedingPatternScreen;