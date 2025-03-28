import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { breastfeedingTips } from "../Data/Tips";
import { useNavigation } from "@react-navigation/native";

const TipsGenerator = () => {
    const [currentTip, setCurrentTip] = useState("");
    const navigation = useNavigation();

    const generateTip = () => {
        const randomIndex = Math.floor(Math.random() * breastfeedingTips.length);
        setCurrentTip(breastfeedingTips[randomIndex]);
    };

    const goToResources = () => {
        navigation.navigate("Resources");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Breastfeeding Tips</Text>
            <Text style={styles.tip}>{currentTip || "Click below to get a tip!"}</Text>

            <TouchableOpacity style={styles.button} onPress={generateTip}>
                <Text style={styles.buttonText}>Generate Tip</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[ styles.button, styles.resourceButton ]} onPress={goToResources}>
                <Text style={styles.buttonText}>Go to Resources</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
    heading: {
        
    }
})