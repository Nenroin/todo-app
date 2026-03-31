import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import TodoEditModal from '../TodoEditModal';
import { handleCancel, handleDelete, handleOk, handleOnCheckboxClick } from './functions';

export default function TodoItem({
    id,
    isChecked,
    name,
    onChange = () => { },
    onDelete = () => { },
}: {
    id: string,
    isChecked: boolean,
    name: string,
    onChange?: () => void,
    onDelete?: () => void,
}) {
    const [open, setOpen] = useState(false);
    const [isCheckedValue, setIsCheckedValue] = useState(isChecked);
    const [inputValue, setInputValue] = useState(name);

    return (
        <>
            <View style={styles.card}>
                <View style={styles.leftSection}>
                    <Checkbox
                        status={isCheckedValue ? 'checked' : 'unchecked'}
                        onPress={() => handleOnCheckboxClick(
                            id,
                            !isCheckedValue,
                            inputValue,
                            setIsCheckedValue,
                            setOpen,
                            onChange
                        )}
                    />
                    <Text style={[
                        styles.todoText,
                        isCheckedValue && styles.strikethrough
                    ]}>
                        {name}
                    </Text>
                </View>

                <View style={styles.rightSection}>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => setOpen(true)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.editButtonText}>✎</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDelete(id, onDelete)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.deleteButtonText}>🗑</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TodoEditModal
                isOpen={open}
                setOpen={setOpen}
                inputValue={inputValue}
                setInputValue={setInputValue}
                onOk={() => handleOk(id, isCheckedValue, inputValue, setOpen, onChange)}
                onCancel={() => handleCancel(setOpen)}
            />
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 4,
        marginHorizontal: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    todoText: {
        fontSize: 16,
        color: '#000',
        flex: 1,
    },
    strikethrough: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    editButton: {
        padding: 8,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#d9d9d9',
        backgroundColor: 'transparent',
        minWidth: 36,
        alignItems: 'center',
    },
    editButtonText: {
        fontSize: 16,
        color: '#666',
    },
    deleteButton: {
        padding: 8,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ff4d4f',
        backgroundColor: 'transparent',
        minWidth: 36,
        alignItems: 'center',
    },
    deleteButtonText: {
        fontSize: 16,
        color: '#ff4d4f',
    },
});