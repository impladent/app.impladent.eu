import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SnackbarProvider } from 'notistack';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import createEmotionCache from '../src/createEmotionCache';
import Login from '../src/Login';
import TokenProvider, { useToken } from '../src/providers/TokenProvider';
import theme from '../src/theme';

const queryClient = new QueryClient();

export default function MyApp({ Component, emotionCache = createEmotionCache(), pageProps }) {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register(`/service-worker.js`)
            });
        }
    }, [])

    return (
        <TokenProvider>
            <SnackbarProvider maxSnack={3}>
                <CacheProvider value={createEmotionCache()}>
                    <LoginRequired>
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
                    </LoginRequired>
                </CacheProvider>
            </SnackbarProvider>
        </TokenProvider>
    );
}

function LoginRequired({ children }) {
    const [token, setToken] = useToken();
    const { push } = useRouter();
    const updateToken = (token) => {
        setToken(token);
        push('/');
    };

    if (!token || !(Date.now() < token.exp * 1000)) {
        return (
            <React.Fragment>
                <Head>
                    <title>Logowanie - app.impladent.eu</title>
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                </Head>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Login onToken={updateToken}/>
                </ThemeProvider>
            </React.Fragment>
        )
    }

    return children;
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired
};
