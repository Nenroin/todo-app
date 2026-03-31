import { deleteTodo, updateTodo } from '../../lib/api';

export const handleDelete = async (id: string, onDelete: () => void) => {
    try {
        await deleteTodo(id);
        onDelete();
    } catch (error) {
        console.error("Failed to delete todo:", error);
    }
};

export const handleOnCheckboxClick = async (
    id: string,
    isChecked: boolean,
    name: string,
    setIsCheckedValue: (value: boolean) => void,
    setOpen: (value: boolean) => void,
    onChange: () => void,
) => {
    if (!name.trim()) {
        return;
    }

    try {
        await updateTodo(id, { isChecked, name });
        setIsCheckedValue(isChecked);
        setOpen(false);
        onChange();
    } catch (error) {
        console.error("Failed to change todo:", error);
    }
};

export const handleOk = async (
    id: string,
    isChecked: boolean,
    name: string,
    setOpen: (value: boolean) => void,
    onChange: () => void,
) => {
    if (!name.trim()) {
        return;
    }

    try {
        await updateTodo(id, { isChecked, name });
        setOpen(false);
        onChange();
    } catch (error) {
        console.error("Failed to change todo:", error);
    }
};

export const handleCancel = (setOpen: (value: boolean) => void) => {
    setOpen(false);
};