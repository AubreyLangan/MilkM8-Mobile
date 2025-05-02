import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    ScrollView,
    StyleSheet,
    Alert,
} from "react-native";

const ContactScreen = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSubmit = () => {
        console.log("Message sent:", formData);
        setSubmitted(true);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Contact Us</Text>
            <Text style={styles.description}>
                If you have questions, feel free to reach out!
            </Text>

            {submitted ? (
                <Text style={styles.successMessage}>
                    Thank you for the message! We'll get to you soon.
                </Text>
            ) : (
                <View style={styles.form}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.name}
                        onChangeText={(text) => handleChange("name", text)}
                        placeholder="Your name"
                        required
                    />

                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.email}
                        onChangeText={(text) => handleChange("email", text)}
                        placeholder="Your Email"
                        keyboardType="email-address"
                        required
                    />

                    <Text style={styles.label}>Message:</Text>
                    <TextInput
                        style={[styles.input, styles.textarea]}
                        value={formData.message}
                        onChangeText={(text) => handleChange("message", text)}
                        placeholder="Your Message"
                        multiline
                        numberOfLines={4}
                        required
                    />

                    <Button title="Send Message" onPress={handleSubmit} />
                </View>
            )}

            <View style={styles.contactInfo}>
                <Text style={styles.subtitle}>Other ways to reach us</Text>
                <Text>Email: support@milkm8.com</Text>
                <Text>Follow us on social media:</Text>
            </View>
        </ScrollView>
    );
};

const 