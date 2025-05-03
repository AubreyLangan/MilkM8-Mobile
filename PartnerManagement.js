import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from "react-native";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
    backupUserData,
    restoreBackup,
    backupToFile,
} from "../services/backupService";

const PartnerManagementScreen = () => {
    const [partnerEmail, setPartnerEmail] = useState("");
    const [partner, setPartner] = useState(null);
    const [sharedData, setSharedData] = useState(null);
    const [partnerData, setPartnerData] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const unsubscreibeSnapshot = onSnapshot(userRef, (docSnap) => {
                    if (docSnap.exists()) {
                        setPartner(docSnap.data().partner);
                        setSharedData(docSnap.data().babyData);
                    }
                });

                return () => unsubscreibeSnapshot();
            }
        });

        return () => unsubscribe();
    }, []);

    const invitePartner = async () => {
        const user = auth.currentUser;
        if (!user) {
            Alert.alert("Authenication required", "Please log in.");
            return;
        }

        try {
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, { partner: partnerEmail }, { merge: true });
            Alert.alert("Success", "Partner invited successfully!");
        } catch (error) {
            console.error("Error inviting partner:", error);
            Alert.alert("Error", "Failed to invite partner.");
        }
    };

    const fetchPartnerData = async () => {
        const user = auth.currentUser;
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            const { partner: partnerEmail } = userSnap.data();
            if (partnerEmail) {
                const partnerDoc = doc(db, "users", partnerEmail);
                const partnerSnap = await getDoc(partnerDoc);
                if (partnerSnap.exists()) {
                    setPartnerData(partnerSnapdata());
                } else {
                    Alert.alert("Info", "No partner account found for this email.")
                }
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Partner Management</Text>

            {partner ? (
                <Text style={styles.infoText}>Connected Partner: {partner}</Text>
            ) : (
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Invite Partner</Text>
                    <TextInput
                        style={styles.input}
                        value={partnerEmail}
                        onChangeText={setPartnerEmail}
                        placeholder="Enter partner's email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Button title="Send Invite" onPress={invitePartner} />
                </View>
            )}

            <Text style={styles.subTitle}>Shared Data</Text>
            {sharedData ? (
                <Text style={styles.json}>{JSON.stringify(sharedData, null, 2)}</Text>
            ) : (
                <Text>No shared data available.</Text>
            )}

            <Button title="Fetch Partner Data" onPress={fetchPartnerData} />

            {partnerData && (
                <View style={styles.section}>
                    <Text style={styles.subTitle}>Partner's Info</Text>
                    <Text style={styles.json}>{JSON.stringify(partnerData, null, 2)}</Text>
                </View>
            )}

            <View style={styles.buttonGroup}>
                <Button title="Backup Data" onPress={backupUserData} />
                <Button title="Restore Backup" onPress={restoreBackup} />
                <Button title="Export Backup" onPress={backupToFile} />
            </View>
        </ScrollView>
    );
};

