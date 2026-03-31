import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createTodo } from '../lib/api';
import TodoEditModal from './TodoEditModal';

export default function AddTodo({ onAdd }: { onAdd: () => void }) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleOk = async () => {
        if (!inputValue.trim()) {
            return;
        }

        try {
            await createTodo(inputValue);

            setInputValue("");
            setOpen(false);

            onAdd();
        } catch (error) {
            console.error("Failed to create todo:", error);
        }
    };

    const handleCancel = () => {
        setInputValue("");
        setOpen(false);
    };

    return (
        <>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setOpen(true)}
                activeOpacity={0.7}
            >
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>

            <TodoEditModal
                isOpen={open}
                setOpen={setOpen}
                inputValue={inputValue}
                setInputValue={setInputValue}
                onOk={handleOk}
                onCancel={handleCancel}
            />
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#d9d9d9',
        backgroundColor: 'transparent',
        minWidth: 36,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#666',
    },
});