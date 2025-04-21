import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Timer = ({ onSubmit }) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const toggleTimer = () => {
        setIsRunning((prev) => !prev);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTime(0);
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
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    };

    const saveSession = () => {
        if (onSubmit) {
            onSubmit({ time });
        }
        resetTimer();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Timer</Text>
            <Text style={styles.timer}>{formatTime(time)}</Text>

            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={toggleTimer}>
                    <Text style={styles.buttonText}>{isRunning ? "Pause" : "Start"}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, time === 0 && styles.disabledButton]}
                    onPress={resetTimer}
                    disabled={timer === 0}
                >
                    <Text style={styles.buttonText}>Reset</Text>
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

