import { Input, Modal } from 'antd';

export default function TodoEdit({
    isOpen,
    setOpen,
    inputValue,
    setInputValue,
    onOk = () => { },
    onCancel = () => { },
}: {
    isOpen: boolean,
    setOpen: (isOpen: boolean) => void,
    inputValue: string,
    setInputValue: (value: string) => void,
    onOk?: () => void,
    onCancel?: () => void,
}) {
    const handleOk = () => {
        setOpen(false);
        onOk();
    };

    const handleCancel = () => {
        setOpen(false);
        onCancel();
    };

    return (
        <Modal
            open={isOpen}
            title="Editing todo"
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Input
                placeholder="Enter something..."
                maxLength={120}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onPressEnter={handleOk}
            />
        </Modal>
    );
}
