import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen w-screen">
        <Sidebar isOpen={isSidebarOpen} close={() => setIsSidebarOpen(false)} />
        <div className="flex flex-1 flex-col">
          <Header
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <div className="flex flex-1 flex-col overflow-y-auto">
            <main className="flex-1">
              <Component {...pageProps} />
            </main>
          </div>
          <Footer />
        </div>
      </div>
    </QueryClientProvider>
  );
}
