import {
  Button,
  Container,
  Group,
  NumberInput,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useNavigate } from 'react-router';

const addNewPost = async (post: { title: string; body: string; user_id: number }) => {
  const res = await axios.post(`/public/v2/users/${post.user_id}/posts`, post);
  return res.data;
};

export default function AddPostPage() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      title: '',
      body: '',
      user_id: 1,
    },
    validate: {
      title: (value) => (value.length > 0 ? null : 'Title is required'),
      body: (value) => (value.length > 0 ? null : 'Body is required'),
      user_id: (value) => (value > 0 ? null : 'User ID is required'),
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = form.values;
    await addNewPost(values);
    navigate('/posts');
  };

  return (
    <Container mt={20}>
      <h5>Add post</h5>
      <form onSubmit={handleSubmit}>
        <TextInput
          my={10}
          required
          label="Title"
          placeholder="Lorem ipsum dolor"
          {...form.getInputProps('title')}
        />
        <Textarea
          required
          my={10}
          label="Body"
          placeholder="Lorem ipsum dolor sit..."
          {...form.getInputProps('body')}
        />
        <NumberInput
          required
          my={10}
          label="User id"
          placeholder="1"
          {...form.getInputProps('user_id')}
        />
        <Group position="right" mt="md">
          <Button type="submit">Add user</Button>
        </Group>
      </form>
    </Container>
  );
}
