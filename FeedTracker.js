import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Modal, Platform } from "react-native";
import DatePicker from "react-native-date-picker";
import RNPickerSelect from "react-native-picker-select";
import { useTheme } from "../utils/ThemeContext";
import { useFeedData } from "../contexts/FeedDataContext";

const FeedTracker = () => {
    const { isDarkMode } = useTheme();
    const { feedData, addFeedDta, updateFeedData, deleteFeedData } = useFeedData();

    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState("");
    const [feedType, setFeedType] = useState("Breastfeeding");
    const [notes, setNotes] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [modalAction, setModalAction] = useState(null);
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [openTimePicker, setOpenTimePicker] = useState(false);

    const handleSubmit = () => {
        if (!amount) {
            Alert.alert("Missing Fields", "Please enter the amount.");
            return;
        }

        const newEntry = {
            id: editingId || Date.now().toString(),
            date: date.toISOString().split("T")[0],
            time: date.toTimeString().split(" ").slice(0,5),
            amount,
            feedType,
            notes,
        };

        if (editingId) {
            updateFeedData(newEntry);
        } else {
            addFeedDta(newEntry);
        }

        resetForm();
    };
}