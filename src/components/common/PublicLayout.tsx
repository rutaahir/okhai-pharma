import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingActionHub } from './FloatingActionHub';
import { PageCurtain } from './PageCurtain';

export const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#5B9A3C]/20 selection:text-[#1E3D2A]">
      {/* Global Floating Glass Navbar */}
      <Navbar />

      {/* Dynamic Route Pages with Page Transition Curtain */}
      <main className="flex-grow">
        <PageCurtain>
          <Outlet />
        </PageCurtain>
      </main>

      {/* Global Mega Footer */}
      <Footer />

      {/* Global Bottom-Right Floating Hub (Quick Info & Scroll-to-Top) */}
      <FloatingActionHub />
    </div>
  );
};
