import '../css/Header/header.css';

import { Anchor, Center, Group, Header as MHeader } from '@mantine/core';
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
      <Center>
        <Group spacing="lg">
          <Anchor className="header-link" variant="text" onClick={handleUsersNavigation}>
            Users
          </Anchor>
          <Anchor className="header-link" variant="text" onClick={handlePostsNavigation}>
            Posts
          </Anchor>
          <Anchor className="header-link" variant="text" onClick={handleToDoNavigation}>
            To Do
          </Anchor>
          <Anchor className="header-link" variant="text" onClick={handleAddPost}>
            Add post
          </Anchor>
          <Anchor className="header-link" variant="text" onClick={handleAddUser}>
            Add user
          </Anchor>
        </Group>
      </Center>
    </MHeader>
  );
}
