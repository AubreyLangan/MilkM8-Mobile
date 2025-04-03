import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../utils/ThemeContext";

const AboutScreen = () => {
    const navigation = useNavigation();
    const { isDarkMode } = useTheme();

    return (
        <ScrollView style={[styles.container, isDarkMode && StyleSheet.darkContainer]}>
            <View style={styles.header}>
                <Text style={styles.title}>About Our App</Text>
                <Text style={styles.subtitle}>Your trusted companion for feeding and baby care tracking.</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Key Features</Text>
                <View style={styles.featureGrid}>
                    <FeatureItem title="Feeding Tracker" onPress={() => navigation.navigate("FeedTracker")} />
                    <FeatureItem title="Pumping Tracker" onPress={() => navigation.navigate("LogEntry")} />
                    <FeatureItem title="Calculators" onPress={() => navigation.navigate("Calculators")} />
                    <FeatureItem title="Help Center" onPress={() => navigation.navigate("HelpCenter")} />
                </View> 
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Our Story</Text>
                <Text style={styles.text}>
                    This app was born out of a desire to make feeding and baby care easier for parents everywhere. As a parent myself, I know how challenging it can be to juggle it all. I hope this app helps you focus on what matters most - your baby.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Meet the Team</Text>
                <View style={styles.teamMember}>
                    <Text style={styles.teamName}>Aubrey Langan</Text>
                    <Text style={styles.teamRole}>Founder & Developer</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerTitle}>Join Us!</Text>
                <Text style={styles.footerTitle}>Take control of your baby care journey.</Text>
                <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate("SignUp")}>
                    <Text style={sytles.signupText}>Sign Up Here</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const FeatureItem = ({ title, onPress }) => (
    <TouchableOpacity style={styles.feature} onPress={onPress}>
        <Text style={styles.featureText}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    darkContainer: {
        backgroundColor: "#1e1e1e",
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 16,
        color: "gray",
        textAlign: "center",
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: "#333",
    },
    featuresGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    feature: {
        backgroundColor: "#f4f4f4",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        width: "48%",
        alignItems: "center",
    },
    featureText: {
        fontSize: 16,
    },
    teamMember: {
        alignItems: "center",
        marginTop: 10,
    },
    teamName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    teamRole: {
        fontSize: 14,
        color: "gray",
    },
    footer: {
        alignItems: "center",
        marginTop: 30,
    },
    footerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    footerText: {
        fontSize: 16,
        color: "gray",
        marginBottom: 10,
    },
    signupButton: {
        backgroundColor: "#6c63ff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    signupText: {
        fontSize: 16,
        color: "#fff",
    },
});

export default AboutScreen;