import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useFeedData } from "../contexts/FeedDataContext";

const MilkStashTracker = () => {
    const { milkStash, addMilkStash, updateMilkStash, removeMilkStash } = useFeedData();
    const [amount, setAmount] = useState("");
    const [location, setLocation] = useState("fridge");
    const [editingId, setEditingId] = useState(null);

    const handleSubmit = () => {
        if (!amount) {
            Alert.alert("Error", "Please enter an amount.");
            return;
        }

        const newEntry = {
            id: editingId || Date.now(),
            amount: parseFloat(amount),
            location: location || "fridge",
        };

        if (editingId) {
            updateMilkStash(newEntry);
            Alert.alert("Success", "Milk stash updated successfully!");
        } else {
            addMilkStash(newEntry);
            Alert.alert("Success", "Milk stash added successfully!");
        }

        resetForm();
    };

    const resetForm = () => {
        setAmount("");
        setLocation("fridge");
        setEditingId(null);
    };

    const handleEdit = (entry) => {
        setAmount(entry.amount.toString());
        setLocation(entry.location);
        setEditingId(entry);
    };
    
    const handleDelete = (id) => {
        removeMilkStash(id);
        Alert.alert("Removed", "Milk stash entry removed successfully!");
    };

    const formatLocation = (loc) => {
        if (loc === "fridge") return "Fridge";
        if (loc === "freezer") return "Freezer";
        if (loc === "deepFreezer") return "Deep Freezer";
        return "Unknown";
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Milk Stash Tracker</Text>

            <Text style={styles.label}>Amount (oz):</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                placeholder="Enter amount"
            />

            <Text style={styles.label}>Storage Location:</Text>
            <Picker
                selectedValue={location}
                style={styles.picker}
                onValueChange={(itemValue) => setLocation(itemValue)}
            >
                <Picker.Item label="Fridge" value="fridge" />
                <Picker.Item label="Freezer" value="freezer" />
                <Picker.Item label="Deep Freezer" value="deepFreezer" />
            </Picker>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>{editingId ? "Save Changes" : "Add Milk"}</Text>
            </TouchableOpacity>

            
        </View>
    )
}