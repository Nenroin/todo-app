import { Flex } from "antd";
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
        <Flex vertical gap={"middle"}>
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
        </Flex>
    );
}
