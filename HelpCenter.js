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
            { q: "How do I log feeding sessions?", a: "Go to the 'Feeding Tracker' page and fill in the form with the details of your feeding session." },
            { q: "Can I track pumping sessions?", a: "Yes! Use the Pumping Tracker in the Log Entry section." },
            { q: "How do I edit a previous e ntry?", a: "Navigate to the entry in your log and click the 'Edit' button to update the details." },
            { q: "Can I track more than one baby?", a: "Yes! You can add multiple profiles for each baby in your family." },
            { q: "Can I export my data?", a: "Yes, go to Settings and use the 'Export Data' feature to download your logs." },
        ] },
        { category: "Technical Help", questions: [
            { q: "How do I enable dark mode?", a: "Go to settings and toggle the Dark Mode button." },
            { q: "Why is my data not syncing?", a: "Ensure you are logged in and have an active internet connection." },
            { q: "What do I do if I forgot my password?", a: "Use the 'Forgot Password' link on the login page to reset your password." },
            { q: "How do I update the app?", a: "Visit your app store and check for updates." },
            { q: "Why am I getting notifications at the wrong time?", a: "Check your device's timezone and notification settings to ensure they're configured correctly." },
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