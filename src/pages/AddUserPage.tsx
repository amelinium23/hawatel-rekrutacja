import { Button, Container, Group, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import { useNavigate } from 'react-router';

const addNewUser = async (user: {
  name: string;
  email: string;
  gender: string;
  status: string;
}) => {
  const res = await axios.post('/public/v1/users', user);
  return res.data;
};

export default function AddUserPage() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      gender: 'male',
      status: 'inactive',
    },

    validate: {
      name: (value) => (value.length > 0 ? null : 'Name is required'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      gender: (value) =>
        value === 'male' || value === 'female' ? null : 'Invalid gender',
      status: (value) =>
        value === 'active' || value === 'inactive' ? null : 'Invalid status',
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = form.values;
    const res = await addNewUser(values);
    const data = res.data.data;
    showNotification({
      title: 'User Added',
      message: `Added User with id: ${data.id}`,
      autoClose: 3000,
    });
    navigate('/users');
  };

  return (
    <Container mt={20}>
      <h5>Add user</h5>
      <form onSubmit={handleSubmit}>
        <TextInput
          my={10}
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        <TextInput
          required
          my={10}
          label="Name"
          placeholder="John Doe"
          {...form.getInputProps('name')}
        />
        <Select
          required
          my={10}
          label="Gender"
          placeholder="male"
          data={['male', 'female']}
          {...form.getInputProps('gender')}
        />
        <Select
          required
          my={10}
          label="Status"
          placeholder="inactive"
          data={['inactive', 'active']}
          {...form.getInputProps('status')}
        />
        <Group position="right" mt="md">
          <Button type="submit">Add user</Button>
        </Group>
      </form>
    </Container>
  );
}
