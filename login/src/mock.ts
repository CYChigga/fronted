import { http } from './services/api';

//用localStorage 模拟用户数据库
const USERS_KEY = 'mock_users';
interface MockUser {
  email: string;
  password: string;
}

// 从localStorage中读取用户列表 
function getUsers(): MockUser[] {
  const raw = localStorage.getItem(USERS_KEY); 
  // 转成 JS 数组
  if (raw) {
    return JSON.parse(raw);                       

  }
  return [];     
}

// 用户填写注册信息 存入数组
function saveUsers(users: MockUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users)); // 数组 → JSON 字符串 → 存入
}


function getRequestBody(error: any): Record<string, string> {
  try {
    // 从error中取出请求体
    const data = error.config.data;
    // 如果没有请求体，就返回空对象
    if (!data) return {};
    // 如果是JSON字符串，就解析成JS对象
    if (typeof data === 'string') {
      return JSON.parse(data);   
    }
    return data;       
  } catch {
    return {};
  }
}

// 拦截器
http.interceptors.response.use(
  // 请求成功（后端正常响应）→ 直接放行
  function (res) {
    return res;
  },
  // 请求失败时 模拟后端响应
  function (error) {
    // Get或者Post
    const method = error.config.method;   
    // 请求地址
    const url = error.config.url;         
    // 登录和注册都是Post 如果不是就直接返回错误
    if (method !== 'post')  return Promise.reject(error);

    // 如果url是登录接口
    if (url === '/login') {
       // 取出参数
      const body = getRequestBody(error); 
      // 账号密码登录
      if (body.username) {
        // 校验密码长度
        if (!body.password || body.password.length < 6) {
          return Promise.resolve({
            data: { status: 'error', message: '密码至少6位' },
          });
        }
        // 查localStorage有没有这个用户
        const users = getUsers();
        const user = users.find(function (u) {
          return u.email === body.username;   // 登录时"用户名"匹配注册时的"邮箱"
        });
        if (!user) {
          return Promise.resolve({
            data: { status: 'error', message: '用户不存在，请先注册' },
          });
        }
        // 校验密码
        if (user.password !== body.password) {
          return Promise.resolve({
            data: { status: 'error', message: '密码错误' },
          });
        }
        // 登录成功
        return Promise.resolve({
          data: { status: 'ok', type: 'account', token: 'mock-token-' + Date.now() },
        });
      }

    }

    // 如果url是注册接口
    if (url === '/register') {
       // 取出参数
      const body = getRequestBody(error); 
      // 校验两次密码是否一致
      if (body.password !== body.confirm) {
        return Promise.resolve({
          data: { status: 'error', message: '两次密码不一致' },
        });
      }
      // users 存储getUsers()读取的所有用户
        const users = getUsers();
      // 找到刚才注册的邮箱
      const exists = users.find(function (u) {
        return u.email === body.email;
      });
      // 如果邮箱已被注册
      if (exists) {
        return Promise.resolve({
          data: { status: 'error', message: '该邮箱已注册' },
        });
      }

      // 新用户注册 存入数组
      users.push({ email:body.email, password:body.password });
      // 保存到localStorage
      saveUsers(users);
      return Promise.resolve({
        data: { status: 'ok', message: '注册成功，请登录' },
      });
    }
    // 不认识的接口 继续报错
    return Promise.reject(error);
  },
);
