import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from './config';

class ApiInstance {
  private axios: AxiosInstance;
  private readonly config;

  constructor() {
    this.config = config;
    this.axios = axios.create({
      baseURL: this.config.apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axios.interceptors.request.use(
      (config) => {
        if (!this.config.isDev) {
          config.headers['X-API-KEY'] = this.config.apiToken;
          const jwtToken = this.getJwtTokenFromLocalStorage();
          if (jwtToken) {
            config.headers['Authorization'] = `Bearer ${jwtToken}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  private getJwtTokenFromLocalStorage(): string | null {
    return localStorage.getItem('access_token');
  }

  async get<T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axios.get(endpoint, options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post<T>(endpoint: string, data: any, options: AxiosRequestConfig = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axios.post(endpoint, data, options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async put<T>(endpoint: string, data: any, options: AxiosRequestConfig = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axios.put(endpoint, data, options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete<T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axios.delete(endpoint, options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const apiInstance = new ApiInstance();
