import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
} from "react-native";

const MilestoneTracker = () => {
    const [milestones, setMilestones] = useState([]);
    const [newMilestone, setNewMilestone] = useState({
        title: "",
        description: "",
        date: "",
        tag: "",
    });

    const handleInputChange = (name, value) => {
        setNewMilestone({ ...newMilestone, [name]: value });
    };

    const addMilestone = () => {
        if (!newMilestone.title || !newMilestone.date) {
            Alert.alert("Error", "Title and date are required!");
            return;
        }
        setMilestones([
            ...milestones,
            { ...newMilestone, id: Date.now().toString() },
        ]);
        setNewMilestone({ title: "", description: "", date: "", tag: "" });
    };

    const deleteMilestone = (id) => {
        setMilestones(milestones.filter((m) => m.id !== id));
    };

    
}