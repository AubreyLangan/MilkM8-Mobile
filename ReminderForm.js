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

    return (
        <View style={{ padding: 16 }}>
            <Text>Title:</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Enter title"
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 8,
                    marginBottom: 12,
                    borderRadius: 6,
                }}
            />

            <Button title="Pick Date" onPress={() => {
                setMode("date");
                setShowDatePicker(true);
            }} />
            <Text style={{ marginVertical: 8 }}>
                Date: {date.toLocaleDateString()}
            </Text>

            <Button title="Pick Time" onPress={() => {
                setMode("time");
                setShowDatePicker(true);
            }} />
            <Text style={{ marginVertical: 8 }}>
                Time: {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </Text>

            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            <Button title="Add Reminder" onPress={handleSubmit} disabled={!title} />
        </View>
    );
};

export default ReminderForm;