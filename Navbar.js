import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";
import { useTheme } from "../utils/ThemeContext";

const Navbar = ({ user, onLogin, onLogout }) => {
    const { isDarkMode, toggleTheme } = useTheme();
    const navigation = useNavigation();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            onLogin(result.user);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        
    )
}