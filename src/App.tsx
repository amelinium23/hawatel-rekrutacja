import { Route, Routes } from 'react-router';

import Header from './components/Header';
import AddPostPage from './pages/AddPostPage';
import AddUserPage from './pages/AddUserPage';
import PostDetailPage from './pages/PostDetailPage';
import PostsPage from './pages/PostsPage';
import TodoPage from './pages/TodoPage';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/todos" element={<TodoPage />} />
        <Route path="/add-post" element={<AddPostPage />} />
        <Route path="add-user" element={<AddUserPage />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </>
  );
}

export default App;
