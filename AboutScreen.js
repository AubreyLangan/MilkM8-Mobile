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
                    
                </View> 
            </View>
        </ScrollView>
    )
}