import { ILogin } from 'shared/interface';
import http from './http';

interface ILoginResponse {
  refresh_token: string;
}

export const login = (auth: ILogin) =>
  http.post<ILoginResponse>(`/auth/login`, auth);
export const getRefreshToken = (refreshToken: string) =>
  http.post(`/auth/refresh-token`, { refreshToken });