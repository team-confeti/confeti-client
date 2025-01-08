import axios from 'axios';

// Axios 인스턴스 생성
export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // BASE_URL 설정
});

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
