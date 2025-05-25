import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, Switch, StyleSheet, ScrollView } from "react-native";
import { getAuth, sendPasswordResetEmail, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../utils/ThemeContext";

const SettingsScreen = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [notificationsEnabled, setNotificationsEnabaled] = useState(true);
    const auth = getAuth();
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [showResetForm, setShowResetForm] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setEmail(user.email || "");
        }
    }, []);

    const handleSaveProfile = () => {
        Alert.alert("Success", "Profile settings saved!");
    };

    const handleExportData = () => {
        Alert.alert("Export", "Your data has been exported.");
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account? This action cannot be undone."
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => Alert.alert("Account deleted."),
                },
            ]
        );
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            Alert.alert("Logged out", "You have been logged out.");
            navigation.navigate("SignIn");
        } catch (error) {
            Alert.alert("Logout Failed", error.message);
        }
    };

    const handleResetPassword = async () => {
        setMessage("");
        setError("");

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent. Check your inbox.");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        
    )
}