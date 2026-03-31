"use client";

import { useState, useEffect } from 'react';
import { Card, Flex } from 'antd';
import { getAllTodos } from './lib/api';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { Todo } from './types';

export default function Home() {
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
        <Flex justify='center' style={{ padding: "12px" }}>
            <Flex style={{ width: "100%", maxWidth: "1024px" }}>
                <Card
                    title="Todo list"
                    extra={<AddTodo onAdd={updateTodos} />}
                    style={{ width: "100%" }}
                >
                    <TodoList todos={todos} onChange={updateTodos}/>
                </Card>
            </Flex>
        </Flex>
    );
}
