import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import { getAllTodos } from '@/lib/api';
import { Todo } from '@/types';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function index() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        updateTodos();
    }, []);

    const updateTodos = async () => {
        try {
            const data = await getAllTodos();
            setTodos(data);
        } catch (error) {
            console.error("Failed to update todos:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Todo list</Text>
                    <AddTodo onAdd={updateTodos} />
                </View>

                <ScrollView style={styles.cardContent}>
                    <TodoList todos={todos} onChange={updateTodos} />
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 12,
        backgroundColor: '#f5f5f5',
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        maxWidth: 1024,
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    cardContent: {
        padding: 16,
        flex: 1,
    },
});