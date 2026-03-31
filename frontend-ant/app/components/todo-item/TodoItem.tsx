"use client";

import { Card, Flex, Button, Typography, Checkbox } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { handleCancel, handleDelete, handleOk, handleOnCheckboxClick } from './functions';
import { useState } from 'react';
import TodoEditModal from '../TodoEditModal';

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
            <Card>
                <Flex align='center' justify="space-between" gap="large">
                    <Flex align='center' gap="large">
                        <Checkbox
                            checked={isCheckedValue}
                            onChange={() => handleOnCheckboxClick(
                                id,
                                !isCheckedValue,
                                inputValue,
                                setIsCheckedValue,
                                setOpen,
                                onChange)} />
                        <Typography.Text delete={isCheckedValue}>{name}</Typography.Text>
                    </Flex>
                    <Flex align='center' gap="small">
                        <Button
                            color="default"
                            variant="outlined"
                            onClick={() => { setOpen(true) }}>
                            <EditOutlined />
                        </Button>
                        <Button
                            color="danger"
                            variant="outlined"
                            onClick={() => handleDelete(id, onDelete)}>
                            <DeleteOutlined />
                        </Button>
                    </Flex>
                </Flex>
            </Card>
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
