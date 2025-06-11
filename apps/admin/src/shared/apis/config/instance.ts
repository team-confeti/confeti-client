import axios from 'axios';

import { ENV_CONFIG } from '@shared/constants/config';

export const axiosInstance = axios.create({
  baseURL: ENV_CONFIG.ADMIN_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
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
