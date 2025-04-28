import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../utils/ThemeContext";

const HelpCenter = () => {
    const { isDarkMode } = useTheme();
    const [activeCategory, setActiveCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const faqs = [
        { category: "General", questions: [
            { q: "What is this app for?", a: "This app helps you track and manage feeding, pumping and baby care routines." },
            { q: "How to get started?", a: "Create an account, set up your profile, and start logging entries!" },
            { q: "Is this app free to use?", a: "Y es, the core features are free. However, premium features may require a subscription." },
            { q: "Can I use this app offline?", a: "The app requires an internet connection for syncing, but you can log entries offline and sync them later." },
            { q: "What platforms does the app support?", a: "The app is available on iOS, Android, and web browsers." },
        ] },
        { category: "Tracking Features", questions: [

        ] },
        { category: "Technical Help", questions: [

        ] },
        { category: "Account Management", questions: [

        ] },
        { category: "Data and Privacy", questions: [

        ] },
        { category: "Customization", questions: [

        ] },
        { category: "Miscellaneous", questions: [
            { q: "Can I set reminders?", a: "Yes, you can set custom reminders for feeding, pumping or other activities in the Reminders section." },
            { q: "What if I encounter a bug?", a: "Please contact our support team using the 'Report a Bug' option in Settings." },
            { q: "How do I suggest a feature?", a: "We'd love to hear from you! Use the 'Feedback' option in the app or email us directly." },
        ] }
    ]
}