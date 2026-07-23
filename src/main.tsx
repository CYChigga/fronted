import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App as AntdApp } from 'antd';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from '@apollo/client/react';
import App from './App';
import { getToken } from './utils/auth';
import './auth.less';

// 每次请求自动从getToken函数读token
const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// 创建前端Apollo客户端实例 配置缓存和链接
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(new HttpLink({ uri: 'http://localhost:3000/graphql' })),
});

// 渲染React应用到DOM
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AntdApp>
          <App />
        </AntdApp>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
);