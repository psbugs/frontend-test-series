import { Route, Routes } from 'react-router-dom';
import { JSX, lazy, Suspense } from 'react';
import { navLinks } from '../utils/common-constants';
import  ProtectedRoute  from './ProtectedRoute';
import StartTest from '../pages/StartTest';
import TestResult from '../pages/TestResult';
import Loader from '../components/Loader';

const Login = lazy(() => import('../pages/Login'));
const AdminDashboard = lazy(() => import('../pages/AdminDashboard'));
const LearnerDashboard = lazy(() => import('../pages/LearnerDashboard'));
const Unauthorized = () => <div className="p-4 text-center text-red-600 font-bold">Unauthorized Access</div>;
export default function AppRoutes() {
  return (
        <Suspense fallback={<Loader />}>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute allowedRoles={['super admin', 'admin', 'instructor']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/learner-dashboard"
              element={
                <ProtectedRoute allowedRoles={['learner']}>
                  <LearnerDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/test-series/start/:testId" element={<StartTest />} />
            <Route path="/test-series/result/:userId" element={<TestResult />} />
        </Routes>

    </Suspense>
  );
};