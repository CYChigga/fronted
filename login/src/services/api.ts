import axios from 'axios';

// axios挂在http对象上
export const http = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// 请求拦截器
http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器
http.interceptors.response.use(
  (res) => res,
  (err) => {
    // 401 清除 token 并跳转登录页
    if (err.response?.status === 401) {
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  },
);

// 登录参数
export interface LoginParams {
  username: string;
  password: string;
  type: string;
}

// 登录结果
export interface LoginResult {
  status: 'ok' | 'error';
  message?: string;
  token?: string;
}

// 注册参数
export interface RegisterParams {
  email: string;
  password: string;
  confirm: string;
  captcha: string;
}


const TOKEN_KEY = 'token';
// 存 token 到 sessionStorage 
export function setToken(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token);
}

// 取token
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
}

// 清除 token
export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
}

// 是否已登录
export function isLoggedIn(): boolean {
  return !!getToken();
}

// 登录接口
export async function login(params: LoginParams): Promise<LoginResult> {
  const { data } = await http.post<LoginResult>('/login', params);
  if (data.status === 'ok' && data.token) {
    setToken(data.token);
  }
  return data;
}

// 注册接口
export async function fakeRegister(values: RegisterParams) {
  const { data } = await http.post('/register', values);
  return data;
}
