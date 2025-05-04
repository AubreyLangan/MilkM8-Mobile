import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Modal from "react-native-modal";
import { useReminders } from "../contexts/ReminderContext";

const ReminderScreen = () => {
    const { reminders, addReminder, deleteReminder, updateReminder } = useReminders();
    const [newReminder, setNewReminder] = useState({ title: '', date: '', time: '' });
    const [editingId, setEditingId] = useState(null);
    const [editedReminder, setEditedReminder] = useState({ title: '', date: '', time: '' });
    const [showModal, setShowModal] = useState(false);
    const [reminderToDelete, setReminderToDelete] = useState(null);

    const handleAddReminder = () => {
        if (!newReminder.title || !newReminder.date || !newReminder.time) {
            Alert.alert('Missing Fields', 'Please fill out all required fields to add a reminder');
            return;
        }
        addReminder({ id: Date.now(), ...newReminder });
        setNewReminder({ title: '', date: '', time: '' });
    };

    const handleEditClick = (reminder) => {
        setEditingId(reminder.id);
        setEditedReminder({ title: reminder.title, date: reminder.date, time: reminder.time });
    };

    const handleSaveEdit = () => {
        if (!editedReminder.title || !editedReminder.date || !editedReminder.time);
        Alert.alert('Missing Fields', 'Please fill out all fields to save.');
        return;
    }
    updateReminder(editingId, editedReminder);
    setEditingId(null);
    setEditedReminder({ title: '', date: '', time: '' });
};

const handleCancelEdit = () => {
    setEditingId(null);
    setEditedReminder({ title: '', date: '', time: '' });
};

const handleDeleteClick = (id) => {
    setReminderToDelete(id);
    setShowModal(true);
};