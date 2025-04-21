import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ClockTimer = ({ onSubmit }) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const toggleTimer = () => {
        setIsRunning((prev) => !prev);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTime(0);
    };

    const saveSession = () => {
        if (onSubmit) {
            onSubmit({ time });
        }
        resetTimer();
    };

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    
}