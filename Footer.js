import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
    const navigation = useNavigation();
    const currentYear = new Date().getFullYear();

    const handleLinkPress = (url) => {
        Linking.openURL(url);
    };

    return (
        <View style={styles.footer}>
            <View style={styles.footerContent}>
                <Text style={styles.footerText}>
                    © {currentYear} MilkM8. All rights reserved.
                </Text>
                <View style={styles.footerNav}>
                    <TouchableOpacity onPress={() => NavigationContainer.navigate("PrivacyPolicy")}>
                        <Text style={styles.link}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("TermsOfService")}>
                        <Text style={styles.link}>Terms of Service</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("ContactPage")}>
                        <Text style={styles.link}>Contact Us</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    
})