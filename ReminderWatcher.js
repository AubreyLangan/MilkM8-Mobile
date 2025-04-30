import { useEffect, useRef } from "react";
import { Alert } from "react-native";
import { useReminders } from "../Contexts/ReminderContext";

const ReminderWatcher = () => {
    const { reminders } = useReminders();
    const triggeredReminders = useRef(new Set());

    useEffect(() => {
        const checkReminders = () => {
            const now = new Date();


            reminders.forEach((reminder) => {
                const reminderTime = new Date(`${reminder.date}T${reminder.time}`);
                const id = reminder.id;

                if (
                    reminderTime <= now && 
                    !triggeredReminders.current.has(id)
                ) {
                    Alert.alert("Reminder", reminder.title);
                    triggeredReminders.current.add(id);
                }
            });
        };

        const interval = setInterval(checkReminders, 6000);
        return () => clearInterval(interval);
    }, [reminders]);

    return null;
};

export default ReminderWatcher;