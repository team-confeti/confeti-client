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

/**
 * instance.interceptors.response.use(
  // 성공적인 응답은 그대로 반환
  (response) => response,
  async (error) => {
    const status = error?.response?.status; // HTTP 상태 코드 추출
    const errorMessage = error?.response?.data?.message; // 서버가 반환한 에러 메시지 추출

    에러 처리 함수: handleError....(status, errorMessage);

    에러를 그대로 다시 던짐 (필요 시)
    return Promise.reject(error);
  },
);
*/
