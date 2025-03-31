import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DropdownMenu = () => {
    const navigation = useNavigation();
    const [statsDropdown, setStatsDropdown] = useState(false);
    const [trackersDropdown, setTrackersDropdown] = useState(false);

    return (
        <View>
            <TouchableOpacity onPress={() => setStatsDropdown(!statsDropdown)} style={styles.dropdown}>
                <Text style={styles.dropdownTitle}>Stats ▾</Text>
            </TouchableOpacity>
            {statsDropdown && (
              <View style={styles.dropdownMenu}>
                <TouchableOpacity onPress={() => navigation.navigate("Stats")}>
                    <Text style={styles.menuItem}>Overview</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("ProgressTrends")}>
                    <Text style={styles.menuItem}>Progress & Trends</Text>
                </TouchableOpacity>
                
              </View>
            )}
        </View>
    )
}