import axios from 'axios';

import { handleAPIError, handleCheckAndSetToken } from './interceptor';

// Axios 인스턴스 생성
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export function get<T>(...args: Parameters<typeof axiosInstance.get>) {
  return axiosInstance.get<T>(...args).then((res) => res.data);
}

export function post<T>(...args: Parameters<typeof axiosInstance.post>) {
  return axiosInstance.post<T>(...args).then((res) => res.data);
}

export function put<T>(...args: Parameters<typeof axiosInstance.put>) {
  return axiosInstance.put<T>(...args).then((res) => res.data);
}

export function patch<T>(...args: Parameters<typeof axiosInstance.patch>) {
  return axiosInstance.patch<T>(...args).then((res) => res.data);
}

export function del<T>(...args: Parameters<typeof axiosInstance.delete>) {
  return axiosInstance.delete<T>(...args).then((res) => res.data);
}

axiosInstance.interceptors.request.use(handleCheckAndSetToken);
axiosInstance.interceptors.response.use((res) => res, handleAPIError);
