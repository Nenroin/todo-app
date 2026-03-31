import { ScrollView } from 'react-native';
import { Todo } from "../types";
import TodoItem from './TodoItem';

export default function TodoList({
    todos,
    onUpdate,
    onDelete,
}: {
    todos: Todo[],
    onUpdate: (
        id: string,
        isChecked: boolean,
        name: string
    ) => void,
    onDelete: (id: string) => void,
}) {
    return (
        <ScrollView
            contentContainerStyle={{
                gap: 8
            }}
        >
            {
                todos.map(i => <TodoItem
                    key={i.id}
                    id={i.id}
                    isChecked={i.isChecked}
                    name={i.name}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />)
            }
        </ScrollView>
    );
}