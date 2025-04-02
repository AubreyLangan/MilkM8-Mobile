import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { LineChart, Grid } from "react-native-svg-charts";
import { BarChart } from "react-native-chart-kit";
import ProgressSharing from "../components/ProgressSharing";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const ProgressTrendsScreen = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "progress_data"));
                const fetchedData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setData(fetchedData);
            } catch (error) {
                console.error("Error fetching progress data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const feedsData = data.map(entry => entry.feeds || 0);
    const pumpsData = data.map(entry => entry.pumps || 0);
    const labels = data.map(entry => entry.date);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Progress and Trends</Text>
            <ProgressSharing />

            {loading ? (
                <ActivityIndicator size="large" color="#6c63ff" />
            ) : data.length === 0 ? (
                <Text style={styles.noData}>No progress data available.</Text>
            ) : (
                <>
                    <View style={styles.chartContainer}>
                        <Text style={styles.chartTitle}>Feeding & Pumoing Trends</Text>
                        <LineChart
                            style={styles.chart}
                            data={feedsData}
                            svg={{ stroke: "#6c63ff" }}
                            contentInset={{ top: 20, bottom: 20 }}
                        >
                            <Grid />
                        </LineChart>
                        <LineChart
                            style={styles.chart}
                            data={pumpsData}
                            svg={{ stroke: "#A89CFF" }}
                            contentInset={{ top: 20, bottom: 20 }}
                        >
                            <Grid />
                        </LineChart>
                    </View>

                    <View style={styles.chartContainer}>
                        <Text style={styles.chartTitle}>Milestone Achievements</Text>
                        <BarChart
                            data={{
                                labels: labels,
                                datasets: [{ data: data.map(entry => entry.milestone || 0) }]
                            }}
                            width={350}
                            height={250}
                            chartConfig={{
                                backgroundColor: "#fff",
                                backgroundGradientFrom: "#fff",
                                backgroundGradientTo: "#fff",
                                color: (opacity = 1) => `rgba(2, 136, 209, ${opacity})`,
                                strokewidth: 2,
                            }}
                        />
                    </View>
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    chartContainer: {
        marginBottom: 30,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    chart: {
        height: 200,
    },
    noData: {
        fontSize: 16,
        textAlign: "center",
        color: "gray",
    },
});

export default ProgressTrendsScreen;