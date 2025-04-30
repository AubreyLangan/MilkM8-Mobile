import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReminderContext = createContext();

export const useReminders = () => useContext(ReminderContext);

export const ReminderProvider = ({ children }) => {
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        const loadReminders = async () => {
            try {
                const stored = await AsyncStorage.getItem("reminders");
                if (stored) setReminders(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to load reminders", e);
            }
        };
        loadReminders();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem("reminders", JSON.stringify(reminders));
    }, [reminders]);

    const addReminder = (reminder) => {
        setReminders((prev) => [...prev, reminder]);
    };

    const deleteReminder = (id) => {
        setReminders((prevReminders) => prevReminders.filter((reminder) => reminder.id !== id));
    };
    
    const updateReminder = (id, updatedReminder) => {
        setReminders((prevReminders) =>
            prevReminders.map((reminder) =>
                reminder.id === id ? { ...reminder, ...updatedReminder } : reminder
            )
        );
    };
    return (
        <ReminderContext.Provider value={{ reminders, addReminder, deleteReminder, updateReminder }}>
            {children}
        </ReminderContext.Provider>
    );
};