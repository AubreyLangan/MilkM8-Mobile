import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const PumpEntry = ({ entry, onEdit }) => {
    return (
        <View style={styles.entryContainer}>
            <Text style={styles.entryText}>
                {entry.date} - {entry.quantity} {entry.unit} ({entry.notes || "No notes"})
            </Text>
            <TouchableOpacity onPress={() => onEdit(entry)} style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
        </View>   
    );
};

const styles = StyleSheet.create({
    entryContainer: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBotttomColor: "#ddd",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    entryText: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    editButton: {
        backgroundColor: "#0288d1",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginLeft: 10,
    },
    editButtonText: {
        color: "#ffffff",
        fontWeight: "bold",
    },
});

export default PumpEntry;