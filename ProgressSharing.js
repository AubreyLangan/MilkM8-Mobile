import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Linking, StyleSheet } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase/firebaseConfig";

const auth = getAuth();

const ProgressSharing = () => {
    const [shareLink, setShareLink] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const checkExistingShareLink = useCallback(async () => {
        if (!user) return;

        const userId = user.uid;
        const docRef = doc(db, "shared_progress", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const baseUrl = "";
            setShareLink(`${baseUrl}/shared-progress/${userId}`);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            checkExistingShareLink();
        }
    }, [user, checkExistingShareLink]);

    return (
        
    )
}