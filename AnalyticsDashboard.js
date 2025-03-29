import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFeedData } from "../contexts/FeedDataContext";

const AnalyticsDashboard = () => {
    const { feedData } = useFeedData();
    const [dateRange, setDateRange] = useState("last7days");
    const [customDate, setCustomDate] = useState({ start: null, end: null });
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const now = new Date();
        let filtered = feedData;

        if (dateRange === "last7days") {
            const last7Days = new Date();
            last7Days.setDate(now.getDate() - 7);
            filtered = feedData.filter(entry => new Date(entry.date) >= last7Days);
        } else if (dateRange === "last30days") {
            const last30Days = new Date();
            last30Days.setDate(now.getDate() - 30);
            filtered = feedData.filter(entry => new Date(entry.date) >= last30Days);
        } else if (dateRange === "custom" && customDate.start && customDate.end) {
            filtered = feedData.filter(entry =>
                new Date(entry.date) >= customDate.start &&
                new Date(entry.date) <= customDate.end
            );
        }

        setFilteredData(filtered);
    }, [feedData, dateRange, customDate]);

    const groupedData = filteredData.reduce((acc, entry) => {
        const date = new Date(entry.date).toLocaleDateString();
        acc[date] = (acc[date] || 0) + entry.amount;
        return acc;
    }, {});

    const sessionsByType = filteredData.reduce(
        (acc, entry) => {
            acc[entry.type] = (acc[entry.type] || 0) + entry.amount;
            return acc;
        },
        { Breastfeeding: 0, Pumping: 0, Formula: 0 }
    );

    const totalAmount = filteredData.reduce((sum, entry) => sum + parseFloat(entry.amount || 0), 0);
    const mostActiveDay = filteredData.reduce((days, entry) => {
        const day = new Date(entry.date).toLocaleDateString("en-US", { weekday: "long" });
        days[day] = (days[day] || 0) + 1;
        return days;
    }, {});
    const mostActiveDayName = Object.keys(mostActiveDay).reduce((a, b) => mostActiveDay[a] > mostActiveDay[b] ? a : b, "");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Analytics Dashboard</Text>

            <View style={styles.filters}>
                <TouchableOpacity style={[styles.filterButton, dateRange === "last7days" && styles.activeButton]} onPress={() => setDateRange("last7days")}>
                    <Text style={styles.buttonText}>Last 7 Days</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.filterButton, dateRange === "last30days" && styles.activeButton]} onPress={() => setDateRange("last30days")}>
                    <Text style={styles.buttonText}>Last 30 Days</Text>
                </TouchableOpacity>
                <TouchableOpacity style={}
            </View>
        </View>
    )
}