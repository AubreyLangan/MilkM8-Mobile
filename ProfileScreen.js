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

    
}