import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CustomCursor } from './components/common/CustomCursor';
import { Preloader } from './components/common/Preloader';
import { ScrollProgress } from './components/common/ScrollProgress';
import { PublicLayout } from './components/common/PublicLayout';

// Public Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ProductsIndex } from './pages/ProductsIndex';
import { ProductNicotineSulfate } from './pages/ProductNicotineSulfate';
import { ProductNicotineAlkaloid } from './pages/ProductNicotineAlkaloid';
import { ProductPureNicotine } from './pages/ProductPureNicotine';
import { QualityProcess } from './pages/QualityProcess';
import { Leadership } from './pages/Leadership';
import { Export } from './pages/Export';
import { Downloads } from './pages/Downloads';
import { Contact } from './pages/Contact';
import { Legal } from './pages/Legal';
import { NotFound } from './pages/NotFound';

// Admin Context & Components
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminInquiries } from './pages/admin/AdminInquiries';

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <AdminAuthProvider>
      <BrowserRouter>
        {/* 1. Custom Interactive Cursor */}
        <CustomCursor />

        {/* 2. Initial Session Preloader */}
        {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

        {/* 3. Top Scroll Progress Indicator */}
        <ScrollProgress />

        {/* 4. Routes Configuration */}
        <Routes>
          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Workspace */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="inquiries" element={<AdminInquiries />} />
            </Route>
          </Route>

          {/* Public Website Pages */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<ProductsIndex />} />
            <Route path="/products/pure-nicotine-usp-ep-99-5" element={<ProductPureNicotine />} />
            <Route path="/products/nicotine-sulfate-40" element={<ProductNicotineSulfate />} />
            <Route path="/products/nicotine-alkaloid-90-95" element={<ProductNicotineAlkaloid />} />
            <Route path="/quality-process" element={<QualityProcess />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/export" element={<Export />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  );
}
