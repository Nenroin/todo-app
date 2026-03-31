import { Todo } from "@/types";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export async function getAllTodos(): Promise<Todo[]> {
  const response = await fetch(`${baseUrl}/todos`);
  
  if (!response.ok) throw new Error('Failed to fetch todos');

  return response.json();
}

export async function createTodo(name: string): Promise<Todo> {
  const response = await fetch(`${baseUrl}/todo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isChecked: false, name: name }),
  });

  if (!response.ok) throw new Error('Failed to create todo');
  
  return response.json();
}

export async function updateTodo(id: string, updates: Partial<Todo>): Promise<Todo> {
  const response = await fetch(`${baseUrl}/todo/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });

  if (!response.ok) throw new Error('Failed to update todo');
  
  return response.json();
}

export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`${baseUrl}/todo/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) throw new Error('Failed to delete todo');
}