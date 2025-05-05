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
        if (!editedReminder.title || !editedReminder.date || !editedReminder.time) {
            Alert.alert("Missing Fields", "Please fill out all fields to save.")
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

    const handleConfirmDelete = () => {
        deleteReminder(reminderToDelete);
        setShowModal(false);
        setReminderToDelete(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Reminders</Text>

            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Title"
                    value={newReminder.title}
                    onChangeText={(text) => setNewReminder({ ...newReminder, title: text })}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Date (YYYY-MM-DD)"
                    value={newReminder.date}
                    onChangeText={(text) => setNewReminder({ ...newReminder, date: text })}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Time (HH:MM)"
                    value={newReminder.time}
                    onChangeText={(text) => setNewReminder({ ...newReminder, time: text })}
                    style={styles.input}
                />
                <Button title="Add Reminder" onPress={handleAddReminder} />
            </View>
    

            <FlatList
                data={reminders}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                    editingId === item.id ? (
                        <View style={styles.reminderItem}>
                            <TextInput
                                value={editedReminder.title}
                                onChangeText={(text) =>
                                    setEditedReminder({ ...editedReminder, title: text })
                                }
                                style={styles.input}
                            />
                            <TextInput
                                value={editedReminder.date}
                                onChangeText={(text) =>
                                    setEditedReminder({ ...editedReminder, date: text })
                                }
                                style={styles.input}
                            />
                            <TextInput
                                value={editedReminder.time}
                                onChangeText={(text) =>
                                    setEditedReminder({ ...editedReminder, time: text })
                                }
                                style={styles.input}
                            />
                            <Button title="Save" onPress={handleSaveEdit} />
                            <Button title="Cancel" onPress={handleCancelEdit} />
                        </View>
                    ) : (
                        <View style={styles.reminderItem}>
                            <Text>
                                {item.title} - {item.date} {item.time}
                            </Text>
                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    onPress={() => handleEditClick(item)}
                                    style={styles.editBtn}
                                >
                                    <Text>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleDeleteClick(item.id)}
                                    style={styles.deleteBtn}
                                >
                                    <Text>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
            />

            <Modal isVisible={showModal}>
                <View style={styles.modalContainer}>
                    <Text>Are you sure you want to delete this reminder?</Text>
                    <View style={styles.buttonRow}>
                        <Button title="Yes" onPress={handleConfirmDelete} />
                        <Button title="No" onPress={() => setShowModal(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: "#fff",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    inputGroup: {
        marginBottom: 20,
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    reminderItem: {
        padding: 15,
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    editBtn: {
        backgroundColor: "#d0f0fd",
        padding: 5,
        borderRadius: 5,
    },
    deleteBtn: {
        backgroundColor: "#fde0e0",
        padding: 5,
        borderRadius: 5,
    },
    modalContainer: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
    },
});

export default ReminderScreen;