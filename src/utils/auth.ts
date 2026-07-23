import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: number;       //userId
  email: string;
  iat: number;       //签发时间
  exp: number;       //过期时间
}

const TOKEN_KEY = 'token';

/** 获取存储的token*/
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

/** 设置token 到 localStorage */
export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

/** 移除token */
export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

/** 解码 JWT，token 不存在或无效时返回 null */
export function decodeToken(): JwtPayload | null {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}

/** 判断token是否已过期（不存在也算过期） */
export function isTokenExpired(): boolean {
  const payload = decodeToken();
  if (!payload) return true;
  // exp 是秒级时间戳，Date.now() 是毫秒级
  return Date.now() >= payload.exp * 1000;
}

/** 判断是否已登录（token存在且未过期） */
export function isLoggedIn(): boolean {
  return !isTokenExpired();
}