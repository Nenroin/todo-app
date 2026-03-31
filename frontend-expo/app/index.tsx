import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import { createTodo, deleteTodo, getAllTodos, updateTodo } from '@/lib/api';
import { Todo } from '@/types';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function index() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const data = await getAllTodos();
                setTodos(data);
            } catch (error) {
                console.error("Failed to update todos:", error);
            }
        };

        fetchTodos();
    }, []);

    const handleAdd = async (name: string) => {
        try {
            const todo = await createTodo(name);
            setTodos(todos.concat(todo));
        } catch (error) {
            console.error("Failed to create todo:", error);
        }
    };

    const handleUpdate = async (
        id: string,
        isChecked: boolean,
        name: string
    ) => {
        try {
            const todo = await updateTodo(id, { isChecked, name });
            setTodos(todos.map(i => (i.id == id) ? todo : i));
        } catch (error) {
            console.error("Failed to change todo:", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTodo(id);
            setTodos(todos.filter(i => i.id != id));
        } catch (error) {
            console.error("Failed to delete todo:", error);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Todo list</Text>
                    <AddTodo onAdd={handleAdd} />
                </View>

                <ScrollView style={styles.cardContent}>
                    <TodoList todos={todos} onUpdate={handleUpdate} onDelete={handleDelete} />
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