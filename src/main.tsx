import { MantineProvider } from '@mantine/core';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { BaseURL } from './defaults';

axios.defaults.baseURL = BaseURL;

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
