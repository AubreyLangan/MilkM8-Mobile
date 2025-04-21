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

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Clock Timer</Text>
            <Text style={styles.timerText}>Elapsed Time:</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={toggleTimer}>
                    <Text style={styles.buttonText}>{isRunning ? "Pause" : "Start"}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, time === 0 && styles.disabledButton]}
                    onPress={resetTimer}
                    disabled={time === 0}
                >
                    <Text style={styles.butttonText}>Reset</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, time === 0 && styles.disabledButton]}
                    onPress={saveSession}
                    disabled={time === 0}
                >
                    <Text style={styles.buttonText}>Save Session</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

