"use client";

import { Button } from 'antd';
import { useState } from 'react';
import TodoEditModal from './TodoEditModal';

export default function AddTodo({ onAdd }: { onAdd: (name: string) => void }) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleOk = () => {
        if (!inputValue.trim()) {
            return;
        }
        
        onAdd(inputValue);

        setInputValue("");
        setOpen(false);
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
