import { Card } from '@mantine/core';

import { Comment } from '../types/Comment';

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <Card p={5} my={10} shadow="sm" withBorder>
      <Card.Section p={5}>Comment {comment.body}</Card.Section>
      <Card.Section p={5}>Commented by {comment.name}</Card.Section>
    </Card>
  );
}
