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
                <TouchableOpacity style={[styles.filterButton, dateRange === "custom" && styles.activeButton]} onPress={() => setDateRange("custom")}>
                    <Text style={styles.buttonText}>Custom</Text>
                </TouchableOpacity>
            </View>

            {dateRange === "custom" && (
                <View style={styles.datePickerContainer}>
                    <DateTimePicker
                        value={customDate.start || new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => setCustomDate({ ...customDate, end: selectedDate })}
                    />
                    <DateTimePicker
                        value={customDate.end || new Date()}
                        mode="date"
                        display="display"
                        onChange={(event, selectedDate) => setCustomDate({ ...customDate, end: selectedDate })}
                    />
                </View>
            )}

            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Session Breakdown</Text>
                <LineChart
                    data={{
                        labels: Object.keys(groupedData),
                        datasets: [{ data: Object.values(groupedData) }],
                    }}
                    width={350}
                    height={220}
                    yAxisSuffix=" Oz"
                    chartConfig={{
                        backgroundColor: "#fff",
                        backgroundGradientFrom: "#f9f9f9",
                        backgroundGradientTo: "#ddd",
                        decimalPlaces: 1,
                        color: (opacity =1) => `rgba(75, 192, 192, ${opacity})`,
                    }}
                    bezier
                />
            </View>

            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Session Breakdown</Text>
                <PieChart
                    data={Object.keys(sessionsByType).map((key, index) => ({
                        name: key,
                        population: sessionsByType[key],
                        color: ["#FF6384", "#36A2EB", "#FFCE56"] [index],
                        legendFontColor: "#7F7F7F",
                        legendFontSize: 15,
                    }))}
                    width={350}
                    height={200}
                    chartConfig={{ backgroundColor: "#fff" }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                />
            </View>

            <View style={styles.summary}>
                <Text style={styles.metric}>Total Amoun Fed: {totalAmount} Oz</Text>
                <Text style={styles.metric}>Most Active Day: {mostActiveDay || "N/A"}</Text>
            </View>

            <View style={styles.recentActivity}>
                <Text style={styles.chartTitle}>Recent Activity</Text>
                <FlatList
                    data={filteredData.slice(0, 5)}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Text style={styles.listItem}>{item.date}: {item.amount} Oz - {item.notes || "No notes"}</Text>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
    filters: { flexDirection: "row", justifyContent: "space-around", marginBottom: 15 },
    filterButton: { padding: 10, borderRadius: 8, backgroundColor: "#ddd" },
    activeButton: { backgroundColor: "#6c63ff" },
    buttonText: { color: "#fff", fontWeight: "bold" },
    datePickerContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
    chartContainer: { alignItems: "center", marginBottom: 20 },
    chartTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    summary: { alignItems: "center", marginBottom: 20 },
    metric: { fontSize: 16, fontWeight: "bold" },
    recentActivity: { marginBottom: 20 },
    listItem: { fontSize: 14, paddingVertical: 5 },
});

export default AnalyticsDashboard;