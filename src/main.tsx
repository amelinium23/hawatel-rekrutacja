import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { BaseURL } from './defaults';

axios.defaults.baseURL = BaseURL;
axios.defaults.headers['Authorization'] = `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`;

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MantineProvider>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </MantineProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
