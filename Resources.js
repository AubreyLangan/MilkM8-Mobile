import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { useTheme } from "../utils/ThemeContext";

const Resources = () => {
    const { isDarkMode } = useTheme();

    const resources = [
        {
            title: "La Leche League International",
            url: "https://llli.org",
            description: "A global nonprofit dedicated to providing breastfeeding support and resources.",
        },
        {
            title: "KellyMom",
            url: "https://kellymom.com/",
            description: "Evidence-based information on breastfeeding and parenting.",
        },
        {
            title: "CDC Breastfeeding Resources",
            url: "https://www.cdc.gov/breastfeeding/index.htm",
            description: "Official breastfeeding guidance and information from the CDC.",
        },
        {
            title: "Pumping Hacks and Tricks",
            url: "https://www.pumpinghacks.com",
            description: "Advice and hacks for maximizing pumping efficiency.",
        },
    ];

    const openLink = async (url) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            alert(`Don't know how to open this URL: ${url}`);
        }
    };

    return (
        <ScrollView style={[styles.container, isDarkMode && styles.darkContainer]}>
            <Text style={[styles.title, isDarkMode && styles.darkText]}>
                Breastfeeding and Pumping Resources
            </Text>
            <Text style={[styles.subtitle, isDarkMode && styles.darkText]}>
                Here are some trusted resources to help you on your breastfeeding and pumping journey:
            </Text>
            {resources.map((resource, index) => (
                <View key={index} style={styles.resourceItem}>
                    <TouchableOpacity onPress={() => openLink(resource.url)}>
                        <Text style={styles.linkText}>{resource.title}</Text>
                    </TouchableOpacity>
                    <Text style={[styles.description, isDarkMode && styles.darkText]}>
                        {resoource.description}
                    </Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        flex: 1,
    },
    darkContainer: {
        backgroundColor: "#121212",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#000",
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        color: "#333",
    },
    resourceItem: {
        marginBottom: 20,
    },
    linkText: {
        fontSize: 18,
        color: "#0288d1",
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
        color: "#555",
    },
    darkText: {
        color: "#e0e0e0",
    },
});

export default Resources;