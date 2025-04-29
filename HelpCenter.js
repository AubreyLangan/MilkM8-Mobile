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
            { q: "How do I delete my account?", a: "Go to Settings > Account Management and select 'Delete Account.' Note that this action is irreversible." },
            { q: "Can I share my account with my partner?", a: "Yes, you can invite other caregivers to view and manage logs by sharing access through the app." },   
        ] },
        { category: "Data and Privacy", questions: [
            { q: "Is my data secure?", a: "We use end-to-end encryption and follow industry standards to protect your data." },
            { q: "How is my data used?", a: "Your data is only used to improve your experience within the app and is never shared without your consent." },
            { q: "Can I back up my data?", a: "Yes, your data is automatically backed up to the cloud when you're online." },
        ] },
        { category: "Customization", questions: [
            { q: "Can I change the theme of the app?", a: "Yes, you can toggle between light and dark mode in the settings." },
            { q: "How do I personalize my baby's profile?", a: "Go to the baby's profile settings and add a photo, birthdate and other details." },
        ] },
        { category: "Miscellaneous", questions: [
            { q: "Can I set reminders?", a: "Yes, you can set custom reminders for feeding, pumping or other activities in the Reminders section." },
            { q: "What if I encounter a bug?", a: "Please contact our support team using the 'Report a Bug' option in Settings." },
            { q: "How do I suggest a feature?", a: "We'd love to hear from you! Use the 'Feedback' option in the app or email us directly." },
        ] },
    ];

    const filteredFaqs = faqs
        .map(category => ({
            ...category,
            questions: category.questions.filter(
                item =>
                    item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.a.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }))
        .filter(category => category.questions.length > 0);

    useEffect(() => {
        if (activeCategory !== null && activeCategory >= filteredFaqs.length) {
            setActiveCategory(null);
        }
    }, [filteredFaqs, activeCategory]);

    return (
        <View style={[styles.container, isDarkMode && styles.darkBackground]}>
            <Text style={[styles.title, isDarkMode && styles.darkText]}>Help Center</Text>

            <TextInput
                style={[styles.searchInput, isDarkMode && styles.darkInput]}
                placeholder="Search FAQs..."
                placeholderTextColor={isDarkMode ? "#aaa" : "#555"}
                value={searchTerm}
                onChangeText={setSearchTerm}
            />

            <ScrollView>
                {filteredFaqs.length === 0 ? (
                    <Text style={styles.noResults}>No results found. Try another search term.</Text>
                ) : (
                    <>
                        <View style={styles.categories}>
                            {filteredFaqs.map((faq, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.category,
                                        activeCategory === index && styles.activeCategory,
                                    ]}
                                    onPress={() => setActiveCategory(activeCategory === index ? null : index)}
                                >
                                    <Text style={[styles.categoryText, isDarkMode && styles.darkText]}>
                                        {faq.category}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {activeCategory !== null && (
                            <View style={styles.faqContent}>
                                <Text style={[styles.categoryTitle, isDarkMode && styles.darkText]}>
                                    {filteredFaqs[activeCategory.category]}
                                </Text>
                                {filteredFaqs[activeCategory].questions.map((item, idx) => (
                                    <View key={idx} style={styles.questionItem}>
                                        <Text style={[styles.question, isDarkMode && styles.darkText]}>{item.q}</Text>
                                        <Text style={[styles.answer, isDarkMode && styles.darkText]}>{item.a}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f7f7f7",
    },
    darkBackground: {
        backgroundColor: "#1c1c1e",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    searchInput: {
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    darkInput: {
        backgroundColor: "#333",
        borderColor: "#555",
    },
    noResults: {
        fontSize: 16,
        textAlign: "center",
        marginTop: 20,
    },
    categories: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 10,
        justifyContent: "center",
    },
    category: {
        backgroundColor: "#e0e0e0",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        margin: 5,
    },
    activeCategory: {
        backgroundColor: "#007BFF",
    },
    categoryText: {
        fontSize: 16,
        color: "#333",
    },
    faqContent: {
        marginTop: 20,
    },
    categoryTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    questionItem: {
        marginBottom: 15,
    },
    question: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    answer: {
        fontSize: 16,
        color: "#666",
    },
});

export default HelpCenter;