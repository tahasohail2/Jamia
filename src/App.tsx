import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import HomePage from './pages/HomePage';
import CnicPage from './pages/CnicPage';
import InstructionsPage from './pages/InstructionsPage';
import FormStep1 from './pages/FormStep1';
import FormStep2 from './pages/FormStep2';
import SuccessPage from './pages/SuccessPage';
import RecordsPage from './pages/RecordsPage';
import RecordDetailPage from './pages/RecordDetailPage';

export default function App() {
    return (
        <FormProvider>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cnic" element={<CnicPage />} />
                    <Route path="/instructions" element={<InstructionsPage />} />
                    <Route path="/form/step1" element={<FormStep1 />} />
                    <Route path="/form/step2" element={<FormStep2 />} />
                    <Route path="/success" element={<SuccessPage />} />
                    <Route path="/records" element={<RecordsPage />} />
                    <Route path="/records/:id" element={<RecordDetailPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </HashRouter>
        </FormProvider>
    );
}
