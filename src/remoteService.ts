import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:8080';

export const remoteGet = async <T>(url: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.get(`${BASE_URL}${url}`);
    return response.data;
  } catch (error) {
    throw new Error(`GET request to ${url} failed: ${error}`);
  }
};

export const remotePost = async <T>(url: string, data: any): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.post(`${BASE_URL}${url}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`POST request to ${url} failed: ${error}`);
  }
};

export const remoteDelete = async <T>(url: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.delete(`${BASE_URL}${url}`);
    return response.data;
  } catch (error) {
    throw new Error(`DELETE request to ${url} failed: ${error}`);
  }
};
