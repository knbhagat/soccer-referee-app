import { QueryRequest, QueryResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw new Error(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    }
  }

  async queryRules(request: QueryRequest): Promise<QueryResponse> {
    return this.makeRequest<QueryResponse>('/api/v1/query', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async healthCheck(): Promise<{ message: string }> {
    return this.makeRequest<{ message: string }>('/');
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export for testing
export { ApiService };
