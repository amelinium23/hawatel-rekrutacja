import { Container, Grid } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from 'react-query';

import PostItem from '../components/PostItem';
import { Post } from '../types/Post';

const getPosts = async (pageNumber: number) => {
  const res = await axios.get('/public/v1/posts?page=' + pageNumber);
  return res.data;
};

export default function PostsPage() {
  const [page, setPage] = useState(1);
  const { data, status, fetchNextPage } = useInfiniteQuery(
    'users',
    ({ pageParam = page }) => getPosts(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage + 1,
      getPreviousPageParam: (firstPage) => firstPage - 1,
    },
  );

  if (status === 'loading') return <Container>Loading...</Container>;
  if (status === 'error') return <Container>Error</Container>;

  const getNextPosts = async () => {
    setPage((prev) => prev + 1);
    await fetchNextPage({ pageParam: page });
  };

  return (
    <Container mt={20}>
      <h4>Posts</h4>
      <InfiniteScroll
        next={getNextPosts}
        loader={<Container mt={20}>Loading...</Container>}
        hasMore={true}
        dataLength={10}
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
