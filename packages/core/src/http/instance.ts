import axios from 'axios';

export function createInstance(baseURL: string) {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  });

  return {
    instance,
    get: <T>(...args: Parameters<typeof instance.get>) =>
      instance.get<T>(...args).then((res) => res.data),
    post: <T>(...args: Parameters<typeof instance.post>) =>
      instance.post<T>(...args).then((res) => res.data),
    put: <T>(...args: Parameters<typeof instance.put>) =>
      instance.put<T>(...args).then((res) => res.data),
    patch: <T>(...args: Parameters<typeof instance.patch>) =>
      instance.patch<T>(...args).then((res) => res.data),
    del: <T>(...args: Parameters<typeof instance.delete>) =>
      instance.delete<T>(...args).then((res) => res.data),
  };
}
