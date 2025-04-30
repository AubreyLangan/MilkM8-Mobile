import React, { useEffect } from "react";
import { Button } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

const SignInComponent = () => {
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: "93518146200-bijcnichfvkit37pvkfe23rpn2vm1op9.apps.googleusercontent.com", 
        });
    }, []);

    const handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            const userCredential = await auth().signInWithCredential(googleCredential);
            console.log("User signed in:", userCredential.user);
        } catch (error) {
            console.error("Google Sign-In Error:", error);
        }
    };

    return <Button title="Sign in with Google" onPress={handleGoogleSignIn} />;
};

export default SignInComponent;