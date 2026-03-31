"use client";

import { Button } from 'antd';
import { useState } from 'react';
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
            <Button
                color="default"
                variant="outlined"
                style={{ paddingRight: "32px", paddingLeft: "32px" }}
                onClick={() => setOpen(true)}
            >
                Add
            </Button>
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
