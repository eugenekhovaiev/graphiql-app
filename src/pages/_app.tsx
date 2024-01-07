import 'normalize.css';
import '@/sass/base/reset.scss';
import '@/sass/globals.scss';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import RootLayout from '@/components/RootLayout';
import { LanguageProvider } from '@/utils/contexts/LangContext';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>GraphiQL App</title>
        <meta name="description" content="Our app description" />
      </Head>
      <LanguageProvider>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </LanguageProvider>
    </>
  );
}
