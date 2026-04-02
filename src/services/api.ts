import type { FormData, SubmittedRecord } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class ApiError extends Error {
  status: number;
  details?: any;

  constructor(
    message: string,
    status: number,
    details?: any
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'An error occurred'
    }));
    throw new ApiError(
      error.message || 'Request failed',
      response.status,
      error.details
    );
  }
  return response.json();
};

export const api = {
  // Create a new student record
  createRecord: async (data: FormData): Promise<SubmittedRecord> => {
    const response = await fetch(`${API_BASE_URL}/api/records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // Get all student records
  getAllRecords: async (): Promise<SubmittedRecord[]> => {
    const response = await fetch(`${API_BASE_URL}/api/records`);
    return handleResponse(response);
  },

  // Get a single record by ID
  getRecordById: async (id: number): Promise<SubmittedRecord> => {
    const response = await fetch(`${API_BASE_URL}/api/records/${id}`);
    return handleResponse(response);
  },

  // Check if CNIC exists and get the record
  checkCnicExists: async (cnic: string): Promise<{ exists: boolean; record?: SubmittedRecord }> => {
    const response = await fetch(`${API_BASE_URL}/api/records/check/${cnic}`);
    if (response.status === 404) {
      return { exists: false };
    }
    const data = await handleResponse(response);
    return { exists: data.exists, record: data.record };
  },

  // Delete a record by ID
  deleteRecord: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/records/${id}`, {
      method: 'DELETE',
    });
    await handleResponse(response);
  },

  // Delete all records
  deleteAllRecords: async (): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/records`, {
      method: 'DELETE',
    });
    await handleResponse(response);
  },

  // Update picture for a record
  updateRecordPicture: async (id: number, formData: FormData): Promise<SubmittedRecord> => {
    const response = await fetch(`${API_BASE_URL}/api/records/${id}/picture`, {
      method: 'PATCH',
      body: formData,
    });
    return handleResponse(response);
  },
};

export { ApiError };
