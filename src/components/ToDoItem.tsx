import { Card } from '@mantine/core';

import { ToDo } from '../types/ToDo';

interface ToDoItemProps {
  toDo: ToDo;
}

export default function ToDoItem({ toDo }: ToDoItemProps) {
  return (
    <Card className="post-item" shadow="sm" withBorder>
      <Card.Section p={5}>Title: {toDo.title}</Card.Section>
      <Card.Section p={5}>Status: {toDo.status}</Card.Section>
      <Card.Section p={5}>User ID: {toDo.user_id}</Card.Section>
      <Card.Section p={5}>
        Due on: {new Date(toDo.due_on).toLocaleDateString()}
      </Card.Section>
    </Card>
  );
}
