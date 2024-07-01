import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-1 flex-col">
        <Header />
        <div className="flex-col- flex flex-1 overflow-y-auto">
          <main className="flex-1">
            <Component {...pageProps} />
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}
