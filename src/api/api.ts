import axios from 'axios'
import type { AxiosInstance } from 'axios'

const API_BASE_URL = '/api'

const api = axios.create({
  baseURL: API_BASE_URL
})

const USE_MOCK_API = true

const mockapi = USE_MOCK_API ? createMockApi() : createRealApi()

export function createMockApi(): AxiosInstance {
  const mockApi = axios.create({
    // baseURL: 'http://localhost:5173/', // mock API 的地址
    timeout: 5000
  })
  return mockApi
}

export function createRealApi(): AxiosInstance {
  const realApi = axios.create({
    baseURL: 'https://www.google.com/', // 真实 API 的地址
    timeout: 5000
  })
  return realApi
}

export const getUsers = async () => {
  const response = await api.get('/users')
  return response.data
}

export const getUserById = async (id: number) => {
  const response = await api.get(`/users/${id}`)
  return response.data
}

export const createUser = async (name: string) => {
  const response = await api.post('/users', { name })
  return response.data
}

export const updateUser = async (id: number, name: string) => {
  const response = await api.put(`/users/${id}`, { name })
  return response.data
}

export const deleteUser = async (id: number) => {
  const response = await api.delete(`/users/${id}`)
  return response.data
}
