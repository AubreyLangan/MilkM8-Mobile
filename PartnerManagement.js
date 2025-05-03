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
}