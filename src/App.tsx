import { Route, Routes } from 'react-router';

import Header from './Header';
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
        <Route path="/todos" element={<TodoPage />} />
      </Routes>
    </>
  );
}

export default App;
