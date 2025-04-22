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
        <View style={styles.container}>
            {shareLink ? (
                <Text style={styles.text}>
                    Share this link:{" "}
                    <Text 
                        styl={styles.link}
                        onPress={() => Linking.openURL(shareLink)}
                    >
                        {shareLink}
                    </Text>
                </Text>
            ) : (
                <Text style={styles.text}>No shared progress found.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    text: {
        fontSize: 16,
    },
    link: {
        color: "#0288d1",
        textDecorationLine: "underline",
    },
});

export default ProgressSharing;