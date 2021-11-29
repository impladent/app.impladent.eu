import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary'
import { useToggle } from 'react-use';
import logo from '../../public/logo.svg';
import Copyright from '../components/Copyright';
import { useToken } from '../providers/TokenProvider';
import { AppLoader } from './AppLoader';

export function AppLayout({ children, title, subtitle, isLoading = false }) {
    const [open, toggle] = useToggle(false);
    const [token] = useToken();
    const { push } = useRouter();

    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        onClick={toggle}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Button color="inherit">{token.sub}</Button>
                </Toolbar>
                <Drawer anchor="left" open={open} onClose={toggle}>
                    <Box p={3} pt={5}  textAlign="center">
                        <img src={logo.src} alt="logo" style={{ width: 200, height: 50 }}/>
                    </Box>
                    <Box
                        sx={{ width: 250 }}
                        role="presentation"
                        onClick={toggle}
                        onKeyDown={toggle}
                    >
                        <List>
                            <ListItem button>
                                <ListItemIcon>
                                    <PersonIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Wizyty" onClick={async () => await push('/wizyty')}/>
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
            </AppBar>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                {isLoading ? <AppLoader/> :
                    <Container maxWidth="sm" component="main" sx={{
                        height: 'calc(100vh - 124px)',
                        overflowX: 'clip',
                        overflowY: 'scroll',
                        marginTop: 2,
                        position: 'relative'
                    }}>
                        {subtitle && <Box p={1}><Typography variant="h5">{subtitle}</Typography></Box>}
                        {children}
                    </Container>}
            </ErrorBoundary>
            <Copyright/>
        </React.Fragment>
    )
}

function ErrorFallback() {
    return <p>error</p>
}
