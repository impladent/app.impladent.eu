import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { CircularProgress, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import decode from 'jwt-decode';
import { useRouter } from 'next/router';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary'
import { useLocalStorage, useToggle } from 'react-use';
import logo from '../public/logo.svg'
import Copyright from './Copyright';

export function AppLayout({ children, isLoading = false }) {
    const [open, toggle] = useToggle(false);
    const [value] = useLocalStorage('impladent_access_token_v1');
    const { push } = useRouter();

    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon onClick={toggle}/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Impladent
                    </Typography>
                    <Button color="inherit">{decode(value).sub}</Button>
                </Toolbar>
                <Drawer anchor="left" open={open} onClose={toggle}>
                    <Box
                        sx={{ width: 250 }}
                        role="presentation"
                        onClick={toggle}
                        onKeyDown={toggle}
                    >
                        <List>
                            <ListItem button>
                                <ListItemIcon>
                                    <InboxIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Wizyty" onClick={() => push('/appointments')}/>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <MailIcon/>
                                </ListItemIcon>
                                <ListItemText primary="opcja2"/>
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
            </AppBar>
            <Container maxWidth="sm" component="main"
                       sx={{ height: 'calc(100vh - 124px)', overflowX: 'clip', overflowY: 'scroll', marginTop: 2 }}>
                {isLoading ? <Loader/> : <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>}
            </Container>
            <Copyright/>
        </React.Fragment>
    )
}

function Loader() {
    return (
        <Box display="flex" alignItems="center" justifyContent="center" height="100%" flexDirection="column"
             justifyItems="space-between">
            <Box p={4}>
                <img src={logo} alt="logo" style="width: 300px; height: 82px"/>
            </Box>
            <CircularProgress/>
        </Box>
    );
}

function ErrorFallback() {
    return <p>error</p>
}
