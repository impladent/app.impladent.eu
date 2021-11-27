import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import decode from 'jwt-decode';
import Head from 'next/head';
import PropTypes from 'prop-types';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useLocalStorage } from 'react-use';
import createEmotionCache from '../src/createEmotionCache';
import { getAccessToken, isExpired } from '../src/jwt';
import Login from '../src/Login';
import theme from '../src/theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();

export default function MyApp(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const [value, setValue] = useLocalStorage('impladent_access_token_v1');

    if (!value || !(Date.now() < decode(value).exp * 1000)) {
        return (
            <CacheProvider value={emotionCache}>
                <Head>
                    <title>Logowanie - app.impladent.eu</title>
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                </Head>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Login onToken={setValue}/>
                </ThemeProvider>
            </CacheProvider>
        );
    }

    return (
        <QueryClientProvider client={queryClient}>
            <CacheProvider value={emotionCache}>
                <Head>
                    <title>app.impladent.eu</title>
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                </Head>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Component {...pageProps} />
                </ThemeProvider>
            </CacheProvider>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired
};
