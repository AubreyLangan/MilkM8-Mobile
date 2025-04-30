import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useReminders } from "../contexts/ReminderContext";

const ReminderForm = () => {
    const { addReminder } = useReminders();
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [mode, setMode] = useState("date");

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const handleSubmit = () => {
        const id = Date.now();
        const reminder = {
            id,
            title,
            date: date.toISOString().split("T")[0],
            time: date.toTimeString().split(" ")[0].slice(0, 5),
        };

        addReminder(reminder);
        setTitle("");
        setDate(new Date());
        Alert.alert("Reminder set!");
    };

    
}