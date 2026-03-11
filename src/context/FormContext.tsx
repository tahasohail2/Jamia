import {
    createContext,
    useContext,
    useReducer,
    useCallback,
    useEffect,
    type ReactNode,
} from 'react';
import { initialFormData } from '../types';
import type { FormData, SubmittedRecord } from '../types';
import { api, ApiError } from '../services/api';

// ─── State & Action Types ───────────────────────────────
interface FormState {
    formData: FormData;
    records: SubmittedRecord[];
    loading: boolean;
    error: string | null;
}

type Action =
    | { type: 'UPDATE_FORM'; payload: Partial<FormData> }
    | { type: 'RESET_FORM' }
    | { type: 'SET_RECORDS'; payload: SubmittedRecord[] }
    | { type: 'ADD_RECORD'; payload: SubmittedRecord }
    | { type: 'DELETE_RECORD'; payload: number }
    | { type: 'CLEAR_RECORDS' }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null };

interface FormContextValue {
    formData: FormData;
    records: SubmittedRecord[];
    loading: boolean;
    error: string | null;
    updateFormData: (fields: Partial<FormData>) => void;
    resetFormData: () => void;
    submitForm: (data: FormData) => Promise<void>;
    fetchRecords: () => Promise<void>;
    deleteRecord: (id: number) => Promise<void>;
    clearAllRecords: () => Promise<void>;
}

// ─── Reducer ────────────────────────────────────────────
function reducer(state: FormState, action: Action): FormState {
    switch (action.type) {
        case 'UPDATE_FORM':
            return { ...state, formData: { ...state.formData, ...action.payload } };

        case 'RESET_FORM':
            return { ...state, formData: { ...initialFormData } };

        case 'SET_RECORDS':
            return { ...state, records: action.payload };

        case 'ADD_RECORD':
            return { ...state, records: [...state.records, action.payload] };

        case 'DELETE_RECORD':
            return { 
                ...state, 
                records: state.records.filter(r => r.id !== action.payload) 
            };

        case 'CLEAR_RECORDS':
            return { ...state, records: [] };

        case 'SET_LOADING':
            return { ...state, loading: action.payload };

        case 'SET_ERROR':
            return { ...state, error: action.payload };

        default:
            return state;
    }
}

// ─── Context ────────────────────────────────────────────
const FormContext = createContext<FormContextValue | null>(null);

interface FormProviderProps {
    children: ReactNode;
}

export function FormProvider({ children }: FormProviderProps) {
    const [state, dispatch] = useReducer(reducer, {
        formData: { ...initialFormData },
        records: [],
        loading: false,
        error: null,
    });

    // Fetch records on mount
    const fetchRecords = useCallback(async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            dispatch({ type: 'SET_ERROR', payload: null });
            const records = await api.getAllRecords();
            dispatch({ type: 'SET_RECORDS', payload: records });
        } catch (error) {
            const message = error instanceof ApiError 
                ? error.message 
                : 'Failed to fetch records';
            dispatch({ type: 'SET_ERROR', payload: message });
            console.error('Error fetching records:', error);
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    useEffect(() => {
        fetchRecords();
    }, [fetchRecords]);

    const updateFormData = useCallback(
        (fields: Partial<FormData>) =>
            dispatch({ type: 'UPDATE_FORM', payload: fields }),
        [],
    );

    const resetFormData = useCallback(
        () => dispatch({ type: 'RESET_FORM' }),
        [],
    );

    const submitForm = useCallback(async (data: FormData) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            dispatch({ type: 'SET_ERROR', payload: null });
            const record = await api.createRecord(data);
            dispatch({ type: 'ADD_RECORD', payload: record });
            dispatch({ type: 'RESET_FORM' });
        } catch (error) {
            const message = error instanceof ApiError 
                ? error.message 
                : 'Failed to submit form';
            dispatch({ type: 'SET_ERROR', payload: message });
            console.error('Error submitting form:', error);
            throw error;
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    const deleteRecord = useCallback(async (id: number) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            dispatch({ type: 'SET_ERROR', payload: null });
            await api.deleteRecord(id);
            dispatch({ type: 'DELETE_RECORD', payload: id });
        } catch (error) {
            const message = error instanceof ApiError 
                ? error.message 
                : 'Failed to delete record';
            dispatch({ type: 'SET_ERROR', payload: message });
            console.error('Error deleting record:', error);
            throw error;
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    const clearAllRecords = useCallback(async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            dispatch({ type: 'SET_ERROR', payload: null });
            await api.deleteAllRecords();
            dispatch({ type: 'CLEAR_RECORDS' });
        } catch (error) {
            const message = error instanceof ApiError 
                ? error.message 
                : 'Failed to clear records';
            dispatch({ type: 'SET_ERROR', payload: message });
            console.error('Error clearing records:', error);
            throw error;
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    return (
        <FormContext.Provider
            value={{
                formData: state.formData,
                records: state.records,
                loading: state.loading,
                error: state.error,
                updateFormData,
                resetFormData,
                submitForm,
                fetchRecords,
                deleteRecord,
                clearAllRecords,
            }}
        >
            {children}
        </FormContext.Provider>
    );
}

export function useFormContext(): FormContextValue {
    const ctx = useContext(FormContext);
    if (!ctx) throw new Error('useFormContext must be used within FormProvider');
    return ctx;
}
