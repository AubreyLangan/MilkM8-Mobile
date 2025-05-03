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
        
    }
}