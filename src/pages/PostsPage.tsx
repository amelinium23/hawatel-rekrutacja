import { Container, Grid } from '@mantine/core';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from 'react-query';

import Loader from '../components/Loader';
import PostItem from '../components/PostItem';
import { Post } from '../types/Post';

const getPosts = async (pageNumber: number | any) => {
  if (Object.keys(pageNumber).length > 0) {
    const pageNum = pageNumber.pageParam;
    const res = await axios.get('/public/v1/posts?page=' + pageNum);
    return res.data;
  }
  const res = await axios.get('/public/v1/posts?page=' + pageNumber);
  return res.data;
};

export default function PostsPage() {
  const { data, status, fetchNextPage } = useInfiniteQuery('users', ({ pageParam = 1 }) =>
    getPosts(pageParam),
  );

  if (status === 'loading') return <Loader />;
  if (status === 'error') return <Container>Error</Container>;

  const lastPage = data?.pages[data.pages.length - 1];

  const getNextPosts = async () => {
    await fetchNextPage({ pageParam: lastPage.meta.pagination.page + 1 });
  };

  return (
    <Container mt={20}>
      <h4>Posts</h4>
      <InfiniteScroll
        next={getNextPosts}
        loader={<Loader />}
        hasMore={lastPage.meta.pagination.links.next !== null}
        dataLength={lastPage.meta.pagination.total}
      >
        <Grid>
          {data?.pages.map((page) =>
            page.data.map((post: Post) => (
              <Grid.Col span={4} key={post.id}>
                <PostItem post={post} />
              </Grid.Col>
            )),
          )}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
}
