import { Container, Grid } from '@mantine/core';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from 'react-query';

import Loader from '../components/Loader';
import UserItem from '../components/UserItem';
import { User } from '../types/User';

const getUsers = async (pageNumber: number | any) => {
  if (Object.keys(pageNumber).length > 0) {
    const pageNum = pageNumber.pageParam;
    const res = await axios.get('/public/v1/users?page=' + pageNum);
    return res.data;
  }
  const res = await axios.get('/public/v1/users?page=' + pageNumber);
  return res.data;
};

function UsersPage() {
  const { data, status, fetchNextPage } = useInfiniteQuery('users', ({ pageParam = 1 }) =>
    getUsers(pageParam),
  );

  if (status === 'loading') return <Loader />;
  if (status === 'error') return <Container>Error</Container>;

  const lastPage = data?.pages[data.pages.length - 1];

  const getNextUsers = async () => {
    await fetchNextPage({ pageParam: lastPage.meta.pagination.page + 1 });
  };

  return (
    <Container mt={20}>
      <h4>Users</h4>
      <InfiniteScroll
        next={getNextUsers}
        loader={<Loader />}
        hasMore={lastPage.meta.pagination.links.next !== null}
        dataLength={lastPage.meta.pagination.total}
      >
        <Grid p={0}>
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
