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
    
})