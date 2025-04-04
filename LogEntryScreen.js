import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import LogEntryForm from "../components/LogEntryForm";
import EditEntryForm from "../components/EditEntryForm";
import Timer from "../components/Timer";
import ClockTimer from "../components/ClockTimer";
import { useTheme } from "../utils/ThemeContext";

const LogEntryScreen = ({ addEntry, entries = [], deleteEntry, updateEntry }) => {
    const { isDarkMode } = useTheme();
    const [editingEntry, setEditingEntry] = useState(null);
    const [showClock, setShowClock] = useState(false);
    const [loading, setLoading] = useState(false);

    const sortedEntries = [...entries].sort((a,b) => b.id - a.id);

    const handleEdit = (entry) => {
        setEditingEntry(entry);
    };

    const handleUpdate = (updatedEntry) => {
        updateEntry(updatedEntry);
        setEditingEntry(null);
    };

    const handleSubmit = async (entry) => {
        setLoading(true);
        try {
            await addEntry(entry);
        } catch (error) {
            console.error("Failed to add entry: error");
        } finally {
            setLoading(false);
        }
    };

    const handleTimerSubmit = async ({ time }) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        const entry = {
            id: Date.now(),
            quantity: 0,
            time: `${minutes}m ${seconds}`,
            unit: "Oz",
            date: new Date().toLocaleDateString(),
            notes: "Added via Timer",
        };

        await handleSubmit(entry);
    };

    return (
        <View style={[styles.container, isDarkMode && styles.darkMode]}>
            <Text style={styles.title}>Log Your Milk</Text>

            {loading && <ActivityIndicator size="large" color="#6c63ff" />}

            <TouchableOpacity style={styles.button} onPress={() => handleSubmit({ id: Date.now(), quantity: 5 })} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? "Processing..." : "Add Entry"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setShowClock(!showClock)}>
                <Text style={styles.buttonText}>{showClock ? "Switch to Timer" : "Switch to Clock"}</Text>
            </TouchableOpacity>

            {showClock ? <ClockTimer onSubmit={handleTimerSubmit} /> : <Timer onSubmit={handleTimerSubmit} />}

            <LogEntryForm onSubmit={addEntry} />

            <Text style={styles.subtitle}>Logged Entries:</Text>
            <FlatList
                data={sortedEntries}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.entryItem}>
                        <Text style={styles.entryText}>
                            {item.id} - {item.time}: {item.quantity} {item.unit} ({item.notes || "No notes"})
                        </Text>
                        <View style={styles.entryButtons}>
                            <TouchableOpacity onPress={() => deleteEntry(item.id)} style={styles.deleteButton}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editButton}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View> 
                )}
            />

            {editingEntry && (
                <EditEntryForm entry={editingEntry} onUpdate={handleUpdate} onCancel={() => setEditingEntry(null)} />
            )}
        </View>
    );
};

