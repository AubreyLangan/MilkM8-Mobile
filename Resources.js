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
}