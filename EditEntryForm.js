import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const EditEntryForm = ({ entry, onUpdate, onCancel }) => {
    const [quantity, setQuantity] = useState(String(entry.quantity));
    const [unit, setUnit] = useState(entry.unit || "oz");
    const [time, setTime] = useState(entry.time || "");
    const [notes, setNotes] = useState(entry.notes || "");

    const handleSubmit = () => {
        onUpdate({
            ...entry,
            quantity: parseFloat(quantity),
            unit,
            time,
            notes,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Edit Entry</Text>

            <Text style={styles.label}>Quantity:</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={quantity}
                onChangeText={setQuantity}
            />

            <Text style={styles.unit}>Unit:</Text>
            <TextInput
                style={styles.input}
                value={unit}
                onChangeText={setUnit}
            />

            <Text style={styles.label}>Time:</Text>
            <TextInput
                style={styles.input}
                value={time}
                onChangeText={setTime}
                placeholder="e.g., 12:30 PM"
            />

            <Text style={styles.label}>Notes:</Text>
            <TextInput
                style={styles.input}
                value={notes}
                onChange={setNotes}
                placeholder="Notes (optional)"
            />

            <View style={styles.buttonRow}>
                <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

