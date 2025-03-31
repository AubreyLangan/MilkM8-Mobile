import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";
import { useTheme } from "../utils/ThemeContext";
import logoidea from "../assets/logoidea2.PNG";
import DropdownMenu from "./DropdownMenu";

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

    const handleLogout = async () => {
        try {
            await signOut(auth);
            onLogout();
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <View style={[styles.navbar, isDarkMode && styles.darkMode]}>
            <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
                <Text style={styles.icon}>{isMenuOpen ? "✖" : "☰"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Image source={logoidea} style={styles.logo} />
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleTheme}>
                <Text style={styles.icon}>{isDarkMode ? "☀" : "🌙"}</Text>
            </TouchableOpacity>

            {isMenuOpen && (
                <View style={styles.menu}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Text style={styles.menuItem}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("About")}>
                        <Text style={styles.menuItem}>About</Text>
                    </TouchableOpacity>

                    {user ? (
                        <>
                            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                                <Text style={styles.menuItem}>Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleLogout}>
                                <Text style={styles.menuItem}>Log Out</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                                <Text style={styles.menuItem}>Sign In</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                                <Text style={styles.menuItem}>Sign Up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleGoogleSignIn}>
                                <Text style={styles.menuItem}>Sign in with Google</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    <DropdownMenu />


                    <TouchableOpacity onPress={() => navigation.navigate("LogEntry")}>
                        <Text style={styles.menuItem}>Log Entry</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Resources")}>
                        <Text style={styles.menuItem}>Resources</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("SettingsPage")}>
                        <Text style={styles.menuItem}>Settings</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#333",
    },
    darkMode: {
        backgroundColor: "111",
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: "contain",
    },
    menu: {
        position: "absolute",
        top: 60,
        left: 0,
        width: "100%",
        backgroundColor: "#444",
        padding: 10,
    },
    menuItem: {
        color: "white",
        fontSize: 18,
        padding: 10,
    },
});

export default Navbar;