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

    const resetForm = () => {
        setDate(new Date());
        setAmount("");
        setFeedType("Breastfeeding");
        setNotes("");
        setEditingId(null);
    };

    const handleEdit = (entry) => {
        setDate(new Date(`${entry.date}T${entry.time}`));
        setAmount(entry.amount);
        setFeedType(entry.feedType);
        setNotes(entry.notes);
        setEditingId(entry.id);
    };

    const handleDelete = (entry) => {
        setSelectedEntry(entry);
        setModalAction("delete");
        setIsModalVisible(true);
    };

    const confirmAction = () => {
        if (modalAction === "delete" && selectedEntry) {
            deleteFeedData(selectedEntry.id);
        }
        setIsModalVisible(false);
        setSelectedEntry(null);
    };

    const cancelAction = () => {
        setIsModalVisible(false);
        setSelectedEntry(null);
    };

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <Text style={styles.heading}>Feed Tracker</Text>

            <View style={styles.form}>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => setOpenDatePicker(true)}
                >
                    <Text>Select Date: {date.toISOString().split("T")[0]}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.input}
                    onPress={() => setOpenDatePicker(true)}
                >
                    <Text>Select Time: {date.toTimeString().split(" ")[0].slice(0,5)}</Text>
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    placeholder="Amount(Oz)"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                />

                <RNPickerSelect
                    onValueChange={(value) => setFeedType(value)}
                    value={feedType}
                    items={[
                        { label: "Breastfeeding", value: "Breastfeeding" },
                        { label: "Formula", value: "Formula" },
                        { label: "Pumping", value: "Pumping" },
                    ]}
                    style={{
                        inputIOS: styles.input,
                        inputAndroid: styles.input,
                    }}
                    placeholder={{}}
                />

                <TextInput
                    style={[StyleSheet.INPUT, { HEIGHT: 80 }]}
                    placeholder="Notes (optional)"
                    value={notes}
                    onChangeText={setNotes}
                    multiline
                />

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>{editingId ? "Save Changes" : "Add Feed"}</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.subheading}>Feeding Log</Text>
            <FlatList
                data={feedData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.feedItem}>
                        <Text style={styles.feedText}>
                            {item.date} {item.time} - {item.amount} Oz ({item.feedType})
                        </Text>
                        <Text style={styles.feedNotes}>{item.notes || "no notes"}</Text>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editButton}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(item)} style={styles.deleteButton}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        
        <Modal
            visible={isModalVisible}
            transparent
            animationType="slide"
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text>Are you sure you want to {modalAction} this entry?</Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={confirmAction} style={styles.confirmButton}>
                            <Text style={styles.buttonText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={cancelAction} style={styles.cancelButton}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>

        <DatePicker
            modal
            open={openDatePicker}
            date={date}
            mode="date"
            onConfirm={(d) => {
                setOpenDatePicker(false);
                setDate(d);
            }}
            onCancel={() => setOpenDatePicker(false)}
        />

        <DatePicker
            modal
            open={openTimePicker}
            date={date}
            mode="time"
            onConfirm={(d) => {
                setOpenTimePicker(false);
                setDate(d);
            }}
            onCancel={() => setOpenTimePicker(false)}
        />
    </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    darkContainer: { backgroundColor: "#121212" },
    heading: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    subheading: { fontSize: 20, marginVertical: 15 },
    form: { marginBottom: 20 },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        padding: 12,
        marginVertical: 5,
        backgroundColor: "#fff",
    },
    submitButton: {
        backgroundColor: "#2196F3",
        padding: 12,
        borderRadius: 5,
        marginTop: 10,
        alignItems: "center",
    },
    feedItem: {
        backgroundColor: "#f9f9f9",
        padding: 15,
        borderRadius: 8,
        marginVertical: 5,
    },
    feedText: { fontSize: 16, fontWeight: "bold" },
    feedNotes: { fontStyle: "italic", marginTop: 5 },
    buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
    editButton: { backgroundColor: "#4caf50", padding: 8, borderRadius: 5 },
    deleteButton: { backgroundColor: "#f44336", padding: 8, borderRadius: 5 },
    confirmButton: { backgroundColor: "#4caf50", padding: 10, borderRadius: 5, margin: 5 },
    cancelButton: { backgroundColor: "#f44336", padding: 10, borderRadius: 5, margin: 5 },
    buttonText: { color: "#fff", fontWeight: "bold" },
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
    modalContent: { backgroundColor: "#fff", padding: 20, borderRadius: 10, width: "80%", alignItems: "center" },
});

export default FeedTracker;