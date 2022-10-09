import '../css/PostItem/style.css';

import { Card } from '@mantine/core';
import { useNavigate } from 'react-router';

import { Post } from '../types/Post';

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/post/${post.id}`, { state: { post } });
  };

  return (
    <Card className="post-item" onClick={onClick} shadow="sm" withBorder>
      <Card.Section p={5}>Title: {post.title}</Card.Section>
      <Card.Section p={5}>Description: {post.body}</Card.Section>
      <Card.Section p={5}>User ID: {post.user_id}</Card.Section>
    </Card>
  );
}
