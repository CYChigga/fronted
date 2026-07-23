// 集中管理gql语句和类型
import { gql } from '@apollo/client';

// 后端返回的用户数据类型
export interface User {
  id: number;
  name: string;
  email: string;
}

// 约束登录返回的数据
export interface LoginData {
  login: {
    success: boolean;
    message: string;
    token: string | null;
    user: User | null;
  };
}


// 登录请求模板
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
      token
      user { id name email }
    }
  }
`;

// 注册请求模板
export const REGISTER = gql`
  mutation Register($input: CreateUserInput!) {
    createUser(createUserInput: $input) { id name email }
  }
`;