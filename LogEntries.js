import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import PumpEntry from "./PumpEntry";
import EditEntryForm from "./EditEntryForm";

const LogEntries = ({ entries, updateEntry }) => {
    const [editingEntry, setEditingEntry] = useState(null);

    const handleEdit = (entry) => {
        setEditingEntry(entry);
    };

    const handleUpdate = (updatedEntry) => {
        updateEntry(updatedEntry);
        setEditingEntry(null);
    };

    return (
        
    )
}