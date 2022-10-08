import { Container, Grid } from '@mantine/core';
import axios from 'axios';
import { useQuery } from 'react-query';

import { User } from '../types/User';

const getUsers = async () => {
  const res = await axios.get('/public/v1/users');
  return res.data;
};

function UsersPage() {
  const { isLoading, data, status } = useQuery('users', getUsers);
  const { meta, data: userData } = data;

  if (isLoading) return <Container>Loading...</Container>;

  return (
    <Container mt={20}>
      <h4>Users</h4>
      <Grid>
        {status === 'success' &&
          userData.map((user: User) => (
            <Grid.Col span={5} key={user.id}>
              <Container>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.gender}</p>
                <p>{user.status}</p>
              </Container>
            </Grid.Col>
          ))}
      </Grid>
    </Container>
  );
}

export default UsersPage;
