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
        <View style={[styles.navbar, isDarkMode && styles.darkMode]}>
            <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
                <Ionicons name={isMenuOpen ? "close" : "menu"} size={28} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Image source={require("../assets/logoidea2.PNG")} style={styles.logo} />
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleTheme}>
                <Ionicons name={isDarkMode ? "sunny" : "moon"} size={28} color="white" />
            </TouchableOpacity>

            
        </View>
    )
}