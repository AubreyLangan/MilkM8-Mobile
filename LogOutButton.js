import React from "react";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { getAuth, signOut } from "firebase/auth";

const LogoutButton = () => {
    const auth = getAuth();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User logged out successfully!");
        } catch (error) {
            console.error("Error logging out:", error);
            Alert.alert("Logout Failed", error.message);
        }
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
    );
};

