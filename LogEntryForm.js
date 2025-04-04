import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

const LogEntryForm = ({ onSubmit }) => {
    const [quantity, setQuantity] = useState("");
    const [unit, setUnit] = useState("oz");
    const [notes, setNotes] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const toggleUnit = () => {
        setUnit((prevUnit) => (prevUnit === "oz" ? "mL" : "oz"));
    };

    const handleSubmit = () => {
        const parsedQuantity = parseFloat(quantity);
        if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
            Alert.alert("Error", "Please enter a valid quantity greater than 0.");
            return;
        }

        onSubmit({
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            quantity: parsedQuantity,
            unit,
            notes: notes.trim(),
        });

        setSuccessMessage("Pump session logged successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);

        setQuantity("");
        setNotes("");
    };

    return (
        <View style={styles.container}>
            {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}

            <Text style={styles.label}>Quantity ({unit}):</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={quantity}
                onChangeText={setQuantity}
                placeholder={`Enter quantity in ${unit}`}
            />

            <TouchableOpacity style={styles.switchButton} onPress={toggleUnit}>
                <Text style={styles.buttonText}>Switch to {unit === "oz" ? "mL" : "oz"}</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Notes:</Text>
            <TextInput
                style={styles.input}
                value={notes}
                onChangeText={setNotes}
                placeholder="Notes (optional)"
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Add Entry</Text>
            </TouchableOpacity>
        </View>
    );
};

