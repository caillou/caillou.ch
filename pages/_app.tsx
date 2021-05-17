import type { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,200;0,400;1,200;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="font-mono font-bold hdpi:font-normal">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
