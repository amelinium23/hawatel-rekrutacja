import { Button, Container, Group } from '@mantine/core';
import { useNavigate } from 'react-router';

export default function Header() {
  const navigate = useNavigate();

  const handleUsersNavigation = () => {
    navigate('/');
  };

  const handlePostsNavigation = () => {
    navigate('/posts');
  };

  const handleToDoNavigation = () => {
    navigate('/todos');
  };

  return (
    <Container px={20}>
      <Group spacing="lg">
        <Button onClick={handleUsersNavigation}>Users</Button>
        <Button onClick={handlePostsNavigation}>Posts</Button>
        <Button onClick={handleToDoNavigation}>To Do</Button>
      </Group>
    </Container>
  );
}
