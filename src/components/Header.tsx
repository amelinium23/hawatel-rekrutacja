import { Anchor, Container, Group, Header as MHeader } from '@mantine/core';
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

  const handleAddUser = () => {
    navigate('/add-user');
  };

  const handleAddPost = () => {
    navigate('/add-post');
  };

  return (
    <MHeader withBorder height={30}>
      <Container>
        <Group spacing="lg">
          <Anchor onClick={handleUsersNavigation}>Users</Anchor>
          <Anchor onClick={handlePostsNavigation}>Posts</Anchor>
          <Anchor onClick={handleToDoNavigation}>To Do</Anchor>
          <Anchor onClick={handleAddPost}>Add post</Anchor>
          <Anchor onClick={handleAddUser}>Add user</Anchor>
        </Group>
      </Container>
    </MHeader>
  );
}
