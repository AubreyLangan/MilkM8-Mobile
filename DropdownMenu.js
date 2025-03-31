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
                <TouchableOpacity onPress={() => navigation.navigate("FeedingPatternGenerator")}>
                    <Text style={styles.menuItem}>Feeding Patterns</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity onPress={() => setTrackersDropdown(!trackersDropdown)} style={styles.dropdown}>
                <Text style={styles.dropdownTitle}>Trackers ▾</Text>
            </TouchableOpacity>
            {trackersDropdown && (
                <View style={styles.dropdownMenu}>
                    <TouchableOpacity onPress={() => navigation.navigate("FeedTracker")}>
                        <Text style={styles.menuItem}>Feed Tracker</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("MilestoneTracker")}>
                        <Text style={styles.menuItem}>Milestone Tracker</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        padding: 10,
    },
    dropdownTitle: {
        fontSize: 18,
        color: "white",
    },
    dropdownMenu: {
        backgroundColor: "#555",
        padding: 10,
    },
    menuItem: {
        color: "white",
        fontSize: 16,
        padding: 5,
    },
});

export default DropdownMenu;