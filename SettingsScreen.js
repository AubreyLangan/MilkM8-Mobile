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
        <ScrollView style={[styles.container, isDarkMode && styles.dark]}>
            <Text style={styles.heading}>Settings</Text>

            <Text style={styles.sectionTitle}>Profile Settings</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <Button title="Save Profile" onPress={handleSaveProfile} />

            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={Styles.toggleRow}>
                <Text>Dark Mode</Text>
                <Switch value={isDarkMode} onValueChange={toggleTheme} />
            </View>
            <View style={styles.toggleRow}>
                <Text>Notifications</Text>
                <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabaled}
                />
            </View>

            <Text style={styles.sectionTitle}>Privacy</Text>
            <Button title="Export Data" onPress={handleExportData} />

            <Text style={styles.sectionTitle}>Account Management</Text>
            <Button title="Log Out" onPress={handleLogout} />

            <Button
                title={showResetForm ? "Cancel Reset" : "Reset Password"}
                onPress={() => setShowResetForm(!showResetForm)}
            />

            {showResetForm && (
                <View style={{ marginTop: 10 }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <Button title="Send Reset Link" onPress={handleResetPassword} />
                </View>
            )}

            {message ? <Text style={styles.success}>{message}</Text> : null}
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Button
                title="Delete Account"
                color="red"
                onPress={handleDeleteAccount}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        flex: 1,
    },
    dark: {
        backgroundColor: "#111",
    },
    heading: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 6,
    },
    toggleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    success: {
        color: "green",
        marginTop: 10,
    },
    error: {
        color: "red",
        marginTop: 10,
    },
});

export default SettingsScreen;