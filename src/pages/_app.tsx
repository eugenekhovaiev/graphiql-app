import 'normalize.css';
import '@/sass/base/reset.scss';
import '@/sass/globals.scss';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import RootLayout from '@/components/RootLayout';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>GraphiQL App</title>
        <meta name="description" content="Our app description" />
      </Head>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </>
  );
}
