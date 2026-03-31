import { Flex } from "antd";
import { Todo } from "../types";
import TodoItem from "./TodoItem";

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
        <Flex vertical gap={"middle"}>
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
        </Flex>
    );
}
