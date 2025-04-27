const API_BASE_URL = 'http://localhost:3001';

export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
};