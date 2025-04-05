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
        
    )
}