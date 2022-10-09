import { Card } from '@mantine/core';

import { User } from '../types/User';

type UserItemProps = {
  user: User;
};

export default function UserItem({ user }: UserItemProps) {
  return (
    <Card p={5} shadow="xs" withBorder>
      <Card.Section p={5}>Name: {user.name}</Card.Section>
      <Card.Section p={5}>Email: {user.email}</Card.Section>
      <Card.Section p={5}>Status: {user.status}</Card.Section>
      <Card.Section p={5}>Gender: {user.gender}</Card.Section>
    </Card>
  );
}
