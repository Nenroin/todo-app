"use client";

import { Card, Flex, Button, Typography, Checkbox } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import TodoEditModal from './TodoEditModal';

export default function TodoItem({
    id,
    isChecked,
    name,
    onUpdate,
    onDelete,
}: {
    id: string,
    isChecked: boolean,
    name: string,
    onUpdate: (
        id: string,
        isChecked: boolean,
        name: string
    ) => void,
    onDelete: (id: string) => void,
}) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isCheckedValue, setIsCheckedValue] = useState(isChecked);
    const [inputValue, setInputValue] = useState(name);

    return (
        <>
            <Card>
                <Flex align='center' justify="space-between" gap="large">
                    <Flex align='center' gap="large">
                        <Checkbox
                            checked={isCheckedValue}
                            onChange={() => {
                                const newIsCheckedValue = !isCheckedValue;
                                onUpdate(id, newIsCheckedValue, inputValue);
                                setIsCheckedValue(newIsCheckedValue);
                            }} />
                        <Typography.Text delete={isCheckedValue}>{name}</Typography.Text>
                    </Flex>
                    <Flex align='center' gap="small">
                        <Button
                            color="default"
                            variant="outlined"
                            onClick={() => { setModalOpen(true) }}>
                            <EditOutlined />
                        </Button>
                        <Button
                            color="danger"
                            variant="outlined"
                            onClick={() => { onDelete(id) }}>
                            <DeleteOutlined />
                        </Button>
                    </Flex>
                </Flex>
            </Card>
            <TodoEditModal
                isOpen={isModalOpen}
                setOpen={setModalOpen}
                inputValue={inputValue}
                setInputValue={setInputValue}
                onOk={() => {
                    onUpdate(id, isCheckedValue, inputValue);
                    setModalOpen(false);
                }}
                onCancel={() => setModalOpen(false)}
            />
        </>
    );
}
