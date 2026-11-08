import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Leaf } from 'lucide-react';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1E3D2A] flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-[#8CC63F] animate-spin mb-4">
          <Leaf className="w-8 h-8" />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-[#8CC63F]">
          Verifying Admin Credentials...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};
