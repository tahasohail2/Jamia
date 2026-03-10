import {
    createContext,
    useContext,
    useReducer,
    useCallback,
    type ReactNode,
} from 'react';
import { initialFormData } from '../constants';
import type { FormData, SubmittedRecord } from '../types';

// ─── State & Action Types ───────────────────────────────
interface FormState {
    formData: FormData;
    records: SubmittedRecord[];
}

type Action =
    | { type: 'UPDATE_FORM'; payload: Partial<FormData> }
    | { type: 'RESET_FORM' }
    | { type: 'ADD_RECORD'; payload: SubmittedRecord }
    | { type: 'DELETE_RECORD'; payload: number }
    | { type: 'CLEAR_RECORDS' };

interface FormContextValue {
    formData: FormData;
    records: SubmittedRecord[];
    updateFormData: (fields: Partial<FormData>) => void;
    resetFormData: () => void;
    addRecord: (record: SubmittedRecord) => void;
    deleteRecord: (index: number) => void;
    clearAllRecords: () => void;
}

// ─── Helpers ────────────────────────────────────────────
function loadRecords(): SubmittedRecord[] {
    try {
        return JSON.parse(localStorage.getItem('submittedRecords') || '[]');
    } catch {
        return [];
    }
}

function persistRecords(records: SubmittedRecord[]): void {
    localStorage.setItem('submittedRecords', JSON.stringify(records));
}

// ─── Reducer ────────────────────────────────────────────
function reducer(state: FormState, action: Action): FormState {
    switch (action.type) {
        case 'UPDATE_FORM':
            return { ...state, formData: { ...state.formData, ...action.payload } };

        case 'RESET_FORM':
            return { ...state, formData: { ...initialFormData } };

        case 'ADD_RECORD': {
            const updated = [...state.records, action.payload];
            persistRecords(updated);
            return { ...state, records: updated };
        }

        case 'DELETE_RECORD': {
            const updated = state.records.filter((_, i) => i !== action.payload);
            persistRecords(updated);
            return { ...state, records: updated };
        }

        case 'CLEAR_RECORDS':
            persistRecords([]);
            return { ...state, records: [] };

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
        records: loadRecords(),
    });

    const updateFormData = useCallback(
        (fields: Partial<FormData>) =>
            dispatch({ type: 'UPDATE_FORM', payload: fields }),
        [],
    );

    const resetFormData = useCallback(
        () => dispatch({ type: 'RESET_FORM' }),
        [],
    );

    const addRecord = useCallback(
        (record: SubmittedRecord) =>
            dispatch({ type: 'ADD_RECORD', payload: record }),
        [],
    );

    const deleteRecord = useCallback(
        (index: number) =>
            dispatch({ type: 'DELETE_RECORD', payload: index }),
        [],
    );

    const clearAllRecords = useCallback(
        () => dispatch({ type: 'CLEAR_RECORDS' }),
        [],
    );

    return (
        <FormContext.Provider
            value={{
                formData: state.formData,
                records: state.records,
                updateFormData,
                resetFormData,
                addRecord,
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
