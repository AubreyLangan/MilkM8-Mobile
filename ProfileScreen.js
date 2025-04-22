import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "../utils/ThemeContext";

const UserProfileScreen = ({
    updatedUser = () => console.warn("No updatedUser function provided"),
    userData = {
        name: "",
        babyName: "",
        unit: "oz",
        goal: "",
    },
}) => {
    const [name, setName] = useState(userData.name || "");
    const [babyName, setBabyName] = useState(userData.babyName || "");
    const [unit, setUnit] = useState(userData.unit || "oz");
    const [goal, setGoal] = useState(userData.goal || "");
    const [feedback, setFeedback] = useState("");
    const { isDarkMode } = useTheme();

    const handleSave = () => {
        const updatedProfile = { name, babyName, unit, goal };

        if (typeof updatedUser === "function") {
            updatedUser(updatedProfile);
            setFeedback("Profile updated successfully!");
            setTimeout(() => setFeedback(""), 3000);
        } else {
            console.error("updatedUser is not a function");
            setFeedback("Failed to save profile.");
        }
    };

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <Text style={[styles.title, isDarkMode && styles.darkText]}>User Profile</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
                style={[styles.input, isDarkMode && styles.darkInput]}
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                placeholderTextColor={isDarkMode ? "#aaa" : "#666"}
            />

            <Text style={styles.label}>Baby's Name</Text>
            <TextInput
                style={[styles.input, isDarkMode && styles.darkInput]}
                value={babyName}
                onChangeText={setBabyName}
                placeholder="Your baby's name"
                placeholderTextColor={isDarkMode ? "#aaa" : "#6666"}
            />

            <Text style={styles.label}>Measurement Unit</Text>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={unit}
                    onValueChange={(value) => setUnit(value)}
                    style={[styles.picker, isDarkMode && styles.darkText]}
                    dropdownIconColor={isDarkMode ? "#fff" : "#000"}
                >
                    <Picker.Item label="Ounces" value="oz" />
                    <Picker.Item label="Milliliters" value="ml" />
                </Picker>
            </View>

            <Text style={styles.label}>Daily Pumping Goal ({unit})</Text>
            <TextInput
                style={[styles.input, isDarkMode && styles.darkInput]}
                value={goal}
                onChangeText={setGoal}
                keyboardType="numeric"
                placeholder="Set your goal"
                placeholderTextColor={isDarkMode ? "#aaa" : "#666"}
            />

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save Profile</Text>
            </TouchableOpacity>

            {feedback ? (
                <Text style={[styles.feedback, isDarkMode && styles.darkText]}>{feedback}</Text>
            ) : null}
        </View>
    );
};

