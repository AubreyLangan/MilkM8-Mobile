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
    const 
}