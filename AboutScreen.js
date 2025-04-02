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

            
        </ScrollView>
    )
}