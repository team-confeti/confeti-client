import { USER_ID_KEY } from '@shared/constants/user-constants';
import axios from 'axios';

// Axios 인스턴스 생성
export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // BASE_URL 설정
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(USER_ID_KEY);

    if (token) {
      config.headers.Authorization = Number(token);
    }
    return config;
  },
  (error) => {
    // TODO: 요청 에러 처리 추가
    return Promise.reject(error);
  },
);

// Axios 응답 인터셉터 추가

// instance.interceptors.response.use(
//   // 성공적인 응답은 그대로 반환
//   (response) => response,
//   async (error) => {
//     const status = error?.response?.status; // HTTP 상태 코드 추출
//     const errorMessage = error?.response?.data?.message; // 서버가 반환한 에러 메시지 추출
//
//
//     return Promise.reject(error);
//   },
// );

export function get<T>(...args: Parameters<typeof instance.get>) {
  return instance.get<T>(...args).then((res) => res.data);
}

export function post<T>(...args: Parameters<typeof instance.post>) {
  return instance.post<T>(...args).then((res) => res.data);
}

export function put<T>(...args: Parameters<typeof instance.put>) {
  return instance.put<T>(...args).then((res) => res.data);
}

export function patch<T>(...args: Parameters<typeof instance.patch>) {
  return instance.patch<T>(...args).then((res) => res.data);
}

export function del<T>(...args: Parameters<typeof instance.delete>) {
  return instance.delete<T>(...args).then((res) => res.data);
}
