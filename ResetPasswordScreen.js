import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ResetPasswordScreen = () => {
    const [email, setEmail] = useState("");
    const auth = getAuth();

    const handleReset = async () => {
        if (!email) {
            Alert.alert("Missing Email", "Please enter your email address.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert("Success", "password reset email sent! Check your inbox.");
            setEmail("");
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={StyleSheet.container}>
            <Text style={StyleSheet.input}>Reset Password</Text>
            <TextInput
                style={StyleSheet.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Button title="Send Reset Link" onPress={handleReset} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 100,
    },
    heading: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
});

export default ResetPasswordScreen;