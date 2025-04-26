import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
    return (
        <Modal
            visible={isOpen}
            transparent
            animationType="fade"
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.conformButton} onPress={onConfirm}>
                            <Text style={styles.buttonText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 10,
    },
    confirmButton: {
        backgroundColor: "#0288d1",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 10,
    },
    cancelButton: {
        backgroundColor: "#ccc",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default ConfirmationModal;