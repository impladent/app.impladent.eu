import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { pl } from 'date-fns/locale';
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
import TokenProvider, { getToken, setToken } from '../src/providers/TokenProvider';
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
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={pl}>
            <TokenProvider>
                <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
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
        </LocalizationProvider>
    );
}

function LoginRequired({ children }) {
    const token = getToken();
    const { push } = useRouter();
    const updateToken = async (token) => {
        setToken(token);
        await push('/');
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
