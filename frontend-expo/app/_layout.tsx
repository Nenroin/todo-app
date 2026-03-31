import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';

export default function AppLayout() {
    useEffect(() => {
        if (Platform.OS === 'web') {
            document.title = 'Todo app';
        }
    }, []);

    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Todo App' }} />
        </Stack>
    );
}
