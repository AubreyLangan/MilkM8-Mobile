import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useRoute } from "@react-navigation/native";

const SharedProgressScreen = () => {
    const route = useRoute();
    const { userId } = route.params;

    const db = getFirestore();
    const [progressData, setProgressData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProgress = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, "shared_progress", userId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProgressData(docSnap.data());
                } else {
                    setError("Progress data not found.");
                }
            } catch (err) {
                console.error("Error fetching progress:", err);
                setError("Failed to load progress.");
            }
            setLoading(false);
        };

        fetchProgress();
    }, [userId]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading progress...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );

        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.heading}>Shared Progress</Text>
                {progressData ? (
                    <View>
                        <Text style={styles.text}>
                            Progress was shared on:{" "}
                            {new Date(progressData.timestamp.toDate()).toLocaleString()}
                        </Text>
                    </View>
                ) : (
                    <Text>No progress data available.</Text>
                )}
            </ScrollView>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    error: {
        color: "red",
        fontSize: 16,
    },
});

export default SharedProgressScreen;