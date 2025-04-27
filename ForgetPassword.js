import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchablkeOpacity } from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigation = useNavigation();
    const auth = getAuth();

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