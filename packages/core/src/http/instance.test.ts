import axios from 'axios';
import { Mock } from 'vitest';

import { createInstance } from './instance';

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

describe('createInstance', () => {
  const baseURL = 'https://api.example.com';
  const mockAxiosInstance = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (mockedAxios.create as Mock).mockReturnValue(mockAxiosInstance);
  });

  it('올바른 설정으로 axios 인스턴스를 생성한다', () => {
    createInstance(baseURL);

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL,
      withCredentials: true,
    });
  });

  it('instance 객체를 반환한다', () => {
    const result = createInstance(baseURL);

    expect(result).toHaveProperty('instance');
    expect(result.instance).toBe(mockAxiosInstance);
  });

  it('모든 HTTP 메소드를 제공한다', () => {
    const result = createInstance(baseURL);

    expect(result).toHaveProperty('get');
    expect(result).toHaveProperty('post');
    expect(result).toHaveProperty('put');
    expect(result).toHaveProperty('patch');
    expect(result).toHaveProperty('del');
  });

  describe('HTTP 메소드 호출', () => {
    it('get 메소드가 올바르게 동작한다', async () => {
      const mockResponse = { data: { id: 1, name: 'test' } };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const { get } = createInstance(baseURL);
      const result = await get('/users');

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/users');
      expect(result).toEqual(mockResponse.data);
    });

    it('post 메소드가 올바르게 동작한다', async () => {
      const mockResponse = { data: { id: 1, name: 'created' } };
      const postData = { name: 'new user' };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const { post } = createInstance(baseURL);
      const result = await post('/users', postData);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/users', postData);
      expect(result).toEqual(mockResponse.data);
    });

    it('put 메소드가 올바르게 동작한다', async () => {
      const mockResponse = { data: { id: 1, name: 'updated' } };
      const putData = { name: 'updated user' };
      mockAxiosInstance.put.mockResolvedValue(mockResponse);

      const { put } = createInstance(baseURL);
      const result = await put('/users/1', putData);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/users/1', putData);
      expect(result).toEqual(mockResponse.data);
    });

    it('patch 메소드가 올바르게 동작한다', async () => {
      const mockResponse = { data: { id: 1, name: 'patched' } };
      const patchData = { name: 'patched user' };
      mockAxiosInstance.patch.mockResolvedValue(mockResponse);

      const { patch } = createInstance(baseURL);
      const result = await patch('/users/1', patchData);

      expect(mockAxiosInstance.patch).toHaveBeenCalledWith(
        '/users/1',
        patchData,
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('del 메소드가 올바르게 동작한다', async () => {
      const mockResponse = { data: { message: 'deleted' } };
      mockAxiosInstance.delete.mockResolvedValue(mockResponse);

      const { del } = createInstance(baseURL);
      const result = await del('/users/1');

      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/users/1');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('에러 처리', () => {
    it('get 메소드에서 에러가 발생하면 에러를 던진다', async () => {
      const mockError = new Error('Network Error');
      mockAxiosInstance.get.mockRejectedValue(mockError);

      const { get } = createInstance(baseURL);

      await expect(get('/users')).rejects.toThrow('Network Error');
    });

    it('post 메소드에서 에러가 발생하면 에러를 던진다', async () => {
      const mockError = new Error('Server Error');
      mockAxiosInstance.post.mockRejectedValue(mockError);

      const { post } = createInstance(baseURL);

      await expect(post('/users', {})).rejects.toThrow('Server Error');
    });
  });

  describe('타입 안정성', () => {
    it('제네릭 타입이 올바르게 적용된다', async () => {
      interface User {
        id: number;
        name: string;
      }

      const mockResponse = { data: { id: 1, name: 'test' } };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const { get } = createInstance(baseURL);
      const result = await get<User>('/users/1');

      expect(result).toEqual(mockResponse.data);
      expect(typeof result.id).toBe('number');
      expect(typeof result.name).toBe('string');
    });
  });

  describe('매개변수 전달', () => {
    it('모든 매개변수가 올바르게 전달된다', async () => {
      const mockResponse = { data: { success: true } };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const { get } = createInstance(baseURL);
      const config = { headers: { 'Custom-Header': 'test' } };

      await get('/users', config);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/users', config);
    });

    it('post 메소드에 config가 올바르게 전달된다', async () => {
      const mockResponse = { data: { success: true } };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const { post } = createInstance(baseURL);
      const data = { name: 'test' };
      const config = { headers: { Authorization: 'Bearer token' } };

      await post('/users', data, config);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/users',
        data,
        config,
      );
    });
  });
});
