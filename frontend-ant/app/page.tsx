"use client";

import { useState, useEffect } from 'react';
import { Card, Flex } from 'antd';
import { createTodo, deleteTodo, getAllTodos, updateTodo } from './lib/api';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { Todo } from './types';

export default function Home() {
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
        <Flex justify='center' style={{ padding: "12px" }}>
            <Flex style={{ width: "100%", maxWidth: "1024px" }}>
                <Card
                    title="Todo list"
                    extra={<AddTodo onAdd={handleAdd} />}
                    style={{ width: "100%" }}
                >
                    <TodoList todos={todos} onUpdate={handleUpdate} onDelete={handleDelete}/>
                </Card>
            </Flex>
        </Flex>
    );
}
