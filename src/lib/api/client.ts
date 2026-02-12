class ApiClient {
  private baseUrl = '/api';

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    const contentType = response.headers.get('content-type');
    const data = contentType?.includes('application/json') 
      ? await response.json() 
      : await response.text();

    if (!response.ok) {
      const error = typeof data === 'object' && data.error 
        ? data.error 
        : `Request failed: ${response.status}`;
      throw new Error(error);
    }

    return data;
  }

  async getProblems(params?: {
    page?: number;
    limit?: number;
    difficulty?: 'Easy' | 'Medium' | 'Hard';
    category?: string;
    tag?: string;
    search?: string;
    sort?: 'order' | 'difficulty' | 'acceptance';
    sortOrder?: 'asc' | 'desc';
  }): Promise<{
    success: boolean;
    data: any[];
    total: number;
    pagination: { page: number; limit: number; total: number; totalPages: number };
  }> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.set(key, String(value));
        }
      });
    }
    const query = searchParams.toString();
    return this.request(`/problems${query ? `?${query}` : ''}`);
  }

  async getProblemFilters(): Promise<{
    success: boolean;
    data: {
      difficulties: ('Easy' | 'Medium' | 'Hard')[];
      categories: string[];
      tags: string[];
    };
  }> {
    return this.request('/problems?action=filters');
  }

  async getProblem(id: string): Promise<{
    success: boolean;
    data: any;
  }> {
    return this.request(`/problems/${id}`);
  }

  async createSubmission(data: {
    problem_id: string;
    code: string;
    language?: string;
    test_results: {
      passed: number;
      total: number;
      error?: string;
    };
  }): Promise<{
    success: boolean;
    data: {
      id: string;
      status: 'accepted' | 'rejected' | 'error';
      test_cases_passed?: number;
      total_test_cases?: number;
      error_message?: string;
      newAchievements?: Array<{
        id: string;
        name: string;
        description: string;
        icon: string;
        rarity: string;
      }>;
    };
  }> {
    return this.request('/submissions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getSubmissions(params?: {
    problem_id?: string;
    limit?: number;
  }): Promise<{
    success: boolean;
    data: any[];
    total: number;
  }> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.set(key, String(value));
        }
      });
    }
    const query = searchParams.toString();
    return this.request(`/submissions${query ? `?${query}` : ''}`);
  }

  async getSubmission(id: string): Promise<{
    success: boolean;
    data: any;
  }> {
    return this.request(`/submissions/${id}`);
  }

  async getUserProgress(id: string): Promise<{
    success: boolean;
    data: any;
  }> {
    return this.request(`/users/${id}/progress`);
  }

  async getCurrentUser(): Promise<{
    success: boolean;
    data: any;
  }> {
    return this.request('/auth/me');
  }

  async getLeaderboard(params?: {
    page?: number;
    limit?: number;
  }): Promise<{
    success: boolean;
    data: any[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.set(key, String(value));
        }
      });
    }
    const query = searchParams.toString();
    return this.request(`/leaderboard${query ? `?${query}` : ''}`);
  }

  async register(data: {
    email: string;
    password: string;
    name: string;
  }): Promise<{
    success: boolean;
    data: any;
  }> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async healthCheck(): Promise<{
    status: string;
    timestamp: string;
    database: { connected: boolean };
  }> {
    return this.request('/health');
  }

  async getAchievements(): Promise<{
    success: boolean;
    data: {
      earned: Array<{
        id: number;
        user_id: string;
        achievement_type: string;
        achieved_at: string;
        metadata: Record<string, unknown> | null;
        definition: {
          id: string;
          name: string;
          description: string;
          icon: string;
          rarity: string;
        };
      }>;
      locked: Array<{
        id: string;
        name: string;
        description: string;
        icon: string;
        rarity: string;
      }>;
      totalEarned: number;
      totalPossible: number;
    };
  }> {
    return this.request('/achievements');
  }
}

export const api = new ApiClient();
