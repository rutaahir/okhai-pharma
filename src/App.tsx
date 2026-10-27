import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CustomCursor } from './components/common/CustomCursor';
import { Preloader } from './components/common/Preloader';
import { ScrollProgress } from './components/common/ScrollProgress';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { PageCurtain } from './components/common/PageCurtain';

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
import { FloatingActionHub } from './components/common/FloatingActionHub';

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <BrowserRouter>
      {/* 1. Custom Interactive Cursor */}
      <CustomCursor />

      {/* 2. Initial Session Preloader */}
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      {/* 3. Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* 4. Global App Layout */}
      <div className="flex flex-col min-h-screen relative selection:bg-[#5B9A3C]/20 selection:text-[#1E3D2A]">
        {/* Global Floating Glass Navbar */}
        <Navbar />

        {/* Dynamic Route Pages with Page Transition Curtain */}
        <main className="flex-grow">
          <PageCurtain>
            <Routes>
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
            </Routes>
          </PageCurtain>
        </main>

        {/* Global Mega Footer */}
        <Footer />

        {/* Global Bottom-Right Floating Hub (Quick Info & Scroll-to-Top) */}
        <FloatingActionHub />
      </div>
    </BrowserRouter>
  );
}
