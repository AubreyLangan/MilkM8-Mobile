import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import PumpEntry from "./PumpEntry";
import EditEntryForm from "./EditEntryForm";

const LogEntries = ({ entries, updateEntry }) => {
    const [editingEntry, setEditingEntry] = useState(null);

    const handleEdit = (entry) => {
        setEditingEntry(entry);
    };

    const handleUpdate = (updatedEntry) => {
        updateEntry(updatedEntry);
        setEditingEntry(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Log Entries</Text>

            <FlatList
                data={entries}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <PumpEntry entry={item} onEdit={handleEdit} />
                )}
                contentContainerStyle={styles.list}
            />

            {editingEntry && (
                <EditEntryForm
                    entry={editingEntry}
                    onUpdate={handleUpdate}
                    onCancel={() => setEditingEntry(null)}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
        flex: 1,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    list: {
        paddingBottom: 20,
    },
});

export default LogEntries;