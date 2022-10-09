import { Container } from '@mantine/core';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router';

import CommentItem from '../components/CommentItem';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

interface LocationState {
  post: Post;
}

const getComments = async (postId: number) => {
  const res = await axios.get(`/public/v1/posts/${postId}/comments`);
  return res.data;
};

export default function PostDetailPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const { post } = state as LocationState;

  const { data, status } = useQuery('post', () => getComments(parseInt(id ?? '') ?? 0));

  return (
    <Container mt={20}>
      <h5>{post.title}</h5>
      <p>{post.body}</p>
      <p>Created by user: {post.user_id}</p>
      <h5>Comments</h5>
      {status === 'loading' && <Container>Loading...</Container>}
      {status === 'error' && <Container>Error</Container>}
      {data.data ? (
        data.data.map((comment: Comment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))
      ) : (
        <p>No comments</p>
      )}
    </Container>
  );
}
