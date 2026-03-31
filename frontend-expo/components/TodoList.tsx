import { ScrollView } from 'react-native';
import { Todo } from "../types";
import TodoItem from "./todo-item/TodoItem";

export default function TodoList({
    todos,
    onChange = () => { },
}: {
    todos: Todo[],
    onChange?: () => void,
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
                    onChange={onChange}
                    onDelete={onChange}
                />)
            }
        </ScrollView>
    );
}