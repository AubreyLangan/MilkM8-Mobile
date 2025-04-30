import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useReminders } from "../contexts/ReminderContext";

const ReminderList = () => {
    const { reminers, deleteReminder } = useReminders();

    const handleRemove = (id) => {
        deleteReminder(id);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Reminders</Text>
            {reminders.length === 0 ? (
                <Text style={styles.noReminders}>No reminders yet.</Text>
            ) : (
                <FlatList
                    data={reminders}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.reminderItem}>
                            <Text style={styles.text}>
                                <Text style={styles.title}>{item.title}</Text> - {item.date} {item.time}
                            </Text>
                            <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.removeButton}>
                                <Text style={styles.removeText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
    },
    noReminders: {
        fontStyle: "italic",
    },
    reminderItem: {
        marginBottom: 12,
        padding: 12,
        backgroundColor: "#f2f2f2",
        borderRadius: 8,
    },
    text: {
        fontSize: 16,
    },
    title: {
        fontWeight: "bold",
    },
    removeButton: {
        marginTop: 8,
        alignSelf: "flex-start",
        backgroundColor: "#e74c3c",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
    },
    removeText: {
        color: "#fff",
        fontWeight: "600",
    },
});

export default ReminderList;