import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
    return (
        <Modal
            visible={isOpen}
            transparent
            animationType="fade"
        >
            <View style={styles.overlap}>
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

