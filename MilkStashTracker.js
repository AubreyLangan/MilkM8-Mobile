import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Touchable } from "react-native";
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

            <Text style={styles.subtitle}>Current Milk Stash</Text>
            {milkStash.length === 0 ? (
                <Text style={styles.noData}>No milk stored yet.</Text>
            ) : (
                <FlatList
                    data={milkStash}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Text style={styles.milkAmount}>
                                {item.amount} Oz - {formatLocation(item.location)}
                            </Text>
                           <View style={styles.actions}>
                                <TouchableOpacity style={styles.actionButton} onPress={() => handleEdit(item)}>
                                    <Text style={styles.actionText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={() => handleDelete(item.id)}>
                                   <Text style={styles.actionText}>Remove</Text> 
                                </TouchableOpacity>
                            </View>
                        </View> 
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginTop: 5,
    },
    picker: {
        marginTop: 5,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#0288d1",
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
    },
    noData: {
        fontSize: 16,
        color: "#888",
        marginTop: 10,
    },
    listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    milkAmount: {
        fontSize: 16,
    },
    actions: {
        flexDirection: "row",
    },
    actionButton: {
        padding: 8,
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: "#6c63ff",
    },
    deleteButton: {
        backgroundColor: "#ff4d4d",
    },
    actionText: {
        color: "#fff",
        fontSize: 14,
    },
});

export default MilkStashTracker;