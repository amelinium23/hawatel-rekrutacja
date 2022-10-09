import { Container, Grid } from '@mantine/core';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from 'react-query';

import Loader from '../components/Loader';
import ToDoItem from '../components/ToDoItem';
import { ToDo } from '../types/ToDo';

const getTodos = async (pageNumber: number | any) => {
  if (Object.keys(pageNumber).length > 0) {
    const pageNum = pageNumber.pageParam;
    const res = await axios.get('/public/v1/todos?page=' + pageNum);
    return res.data;
  }
  const res = await axios.get('/public/v1/todos?page=' + pageNumber);
  return res.data;
};

export default function TodoPage() {
  const { data, status, fetchNextPage } = useInfiniteQuery('todos', ({ pageParam = 1 }) =>
    getTodos(pageParam),
  );

  if (status === 'loading') return <Loader />;
  if (status === 'error') return <Container>Error</Container>;

  const lastPage = data?.pages[data.pages.length - 1];

  const getNextTodos = async () => {
    await fetchNextPage({ pageParam: lastPage.meta.pagination.page + 1 });
  };

  return (
    <Container mt={20}>
      <h4>ToDos</h4>
      <InfiniteScroll
        next={getNextTodos}
        loader={<Loader />}
        hasMore={lastPage.meta.pagination.links.next !== null}
        dataLength={lastPage.meta.pagination.total}
      >
        <Grid>
          {data?.pages.map((page) =>
            page.data.map((toDo: ToDo) => (
              <Grid.Col span={4} key={toDo.id}>
                <ToDoItem toDo={toDo} />
              </Grid.Col>
            )),
          )}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
}
