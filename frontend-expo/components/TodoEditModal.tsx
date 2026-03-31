import { Modal, StyleSheet, Text, TextInput, View } from 'react-native';

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
        if (!inputValue.trim()) {
            return;
        }

        setOpen(false);
        onOk();
    };

    const handleCancel = () => {
        setOpen(false);
        onCancel();
    };

    return (
        <Modal
            visible={isOpen}
            transparent={true}
            animationType="fade"
            onRequestClose={handleCancel}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Editing todo</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter something..."
                        maxLength={120}
                        value={inputValue}
                        onChangeText={setInputValue}
                        onSubmitEditing={handleOk}
                        autoFocus={true}
                    />

                    <View style={styles.buttonContainer}>
                        <Text style={styles.cancelButton} onPress={handleCancel}>
                            Cancel
                        </Text>
                        <Text style={styles.okButton} onPress={handleOk}>
                            OK
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        width: '80%',
        maxWidth: 400,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
        color: '#000',
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 16,
    },
    cancelButton: {
        fontSize: 16,
        color: '#666',
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    okButton: {
        fontSize: 16,
        color: '#1890ff',
        fontWeight: '600',
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
});