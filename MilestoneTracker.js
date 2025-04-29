import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
} from "react-native";

const MilestoneTracker = () => {
    const [milestones, setMilestones] = useState([]);
    const [newMilestone, setNewMilestone] = useState({
        title: "",
        description: "",
        date: "",
        tag: "",
    });

    const handleInputChange = (name, value) => {
        setNewMilestone({ ...newMilestone, [name]: value });
    };

    const addMilestone = () => {
        if (!newMilestone.title || !newMilestone.date) {
            Alert.alert("Error", "Title and date are required!");
            return;
        }
        setMilestones([
            ...milestones,
            { ...newMilestone, id: Date.now().toString() },
        ]);
        setNewMilestone({ title: "", description: "", date: "", tag: "" });
    };

    const deleteMilestone = (id) => {
        setMilestones(milestones.filter((m) => m.id !== id));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Milestone Tracker</Text>

            <View style={styles.inputGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Milestone Title"
                    value={newMilestone.title}
                    onChangeText={(text) => handleInputChange("description", text)}
                    multiline
                />
                <TextInput
                    style={styles.input}
                    placeholder="Date (YYYY-MM-DD)"
                    value={newMilestone.date}
                    onChangeText={(text) => handleInputChange("date", text)}
                />
                <TextInput
                    style={[styles.input, textArea]}
                    placeholder="Description (optional)"
                    value={newMilestone.description}
                    onChangeText={(text) => handleInputChange("description", text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Tag (optional)"
                    value={newMilestone.tag}
                    onChangeText={(text) => handleInputChange("tag", text)}
                />
                <Button title="Add Milestone" onPress={addMilestone} />
            </View>

            {milestones.length === 0 ? (
                <Text style={styles.noMilestones}>No milestones yet. Start by adding one!</Text>
            ) : (
                milestones.map((milestone) => (
                    <View key={milestone.id} style={styles.milestoneCard}>
                        <Text style={styles.milestoneTitle}>{milestone.title}</Text>
                        {milestone.description ? <Text>{milestone.description}</Text> : null}
                        <Text><Text style={styles.bold}>Date:</Text> {milestone.date}</Text>
                        {milestone.tag ? (
                            <Text><Text style={styles.bold}>Tag:</Text> {milestone.tag}</Text>
                        ) : null}
                        <TouchableOpacity onPress={() => deleteMilestone(milestone.id)}>
                            <Text style={styles.delete}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center",
    },
    inputGroup: {
        marginBottom: 24,
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        marginBottom: 12,
    },
    textArea: {
        height: 80,
    },
    milestoneCard: {
        backgroundColor: "#f9f9f9",
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        borderColor: "#ddd",
        borderWidth: 1,
    },
    milestoneTitle: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 4,
    },
    bold: {
        fontWeight: "bold",
    },
    delete: {
        marginTop: 8,
        color: "red",
        fontWeight: "600",
    },
    noMilestones: {
        textAlign: "center",
        fontStyle: "italic",
    },
});

export default MilestoneTracker;