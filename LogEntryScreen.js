import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import LogEntryForm from "../components/LogEntryForm";
import EditEntryForm from "../components/EditEntryForm";
import Timer from "../components/Timer";
import ClockTimer from "../components/ClockTimer";
import { useTheme } from "../utils/ThemeContext";

const LogEntryScreen = ({ addEntry, entries = [], deleteEntry, updateEntry }) => {
    const { isDarkMode } = useTheme();
    const [editingEntry, setEditingEntry] = useState(null);
    const [showClock, setShowClock] = useState(false);
    const [loading, setLoading] = useState(false);

    const sortedEntries = [...entries].sort((a,b) => b.id - a.id);

    const handleEdit = (entry) => {
        setEditingEntry(entry);
    };

    const handleUpdate = (updatedEntry) => {
        updateEntry(updatedEntry);
        setEditingEntry(null);
    };

    
}