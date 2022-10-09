import { Container, Grid } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from 'react-query';

import UserItem from '../components/UserItem';
import { User } from '../types/User';

const getUsers = async (pageNumber: number) => {
  const res = await axios.get('/public/v1/users?page=' + pageNumber);
  return res.data;
};

function UsersPage() {
  const [page, setPage] = useState(1);
  const { data, status, fetchNextPage } = useInfiniteQuery(
    'users',
    ({ pageParam = page }) => getUsers(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage + 1,
      getPreviousPageParam: (firstPage) => firstPage - 1,
    },
  );

  if (status === 'loading') return <Container>Loading...</Container>;
  if (status === 'error') return <Container>Error</Container>;

  const getNextUsers = async () => {
    setPage((prev) => prev + 1);
    await fetchNextPage({ pageParam: page });
  };

  return (
    <Container mt={20}>
      <h4>Users</h4>
      <InfiniteScroll
        next={getNextUsers}
        loader={<Container mt={20}>Loading...</Container>}
        hasMore={true}
        dataLength={data?.pages.concat(data?.pages ?? []).length || [].length}
      >
        <Grid>
          {data?.pages.map((page) =>
            page.data.map((user: User) => (
              <Grid.Col span={4} key={user.id}>
                <UserItem user={user} />
              </Grid.Col>
            )),
          )}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
}

export default UsersPage;
