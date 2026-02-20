import apiClient from '@/lib/api-client';

// GET fetcher
export async function getFetcher(url: string) {
  const response = await apiClient.get(url);
  return response.data;
}

// POST fetcher
export async function postFetcher(url: string, data?: any) {
  const response = await apiClient.post(url, data);
  return response.data;
}

// PUT fetcher
export async function putFetcher(url: string, data?: any) {
  const response = await apiClient.put(url, data);
  return response.data;
}

// PATCH fetcher
export async function patchFetcher(url: string, data?: any) {
  const response = await apiClient.patch(url, data);
  return response.data;
}

// DELETE fetcher
export async function deleteFetcher(url: string) {
  const response = await apiClient.delete(url);
  return response.data;
}
