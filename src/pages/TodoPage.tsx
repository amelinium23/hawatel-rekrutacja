import { Container } from '@mantine/core';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';

import Loader from '../components/Loader';

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
    </Container>
  );
}
