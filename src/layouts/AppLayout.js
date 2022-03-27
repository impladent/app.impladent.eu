import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary'
import { useToggle } from 'react-use';
import Copyright from '../components/Copyright';
import { useToken } from '../providers/TokenProvider';
import { AppDrawer } from './AppDrawer';
import { AppLoader } from './AppLoader';

export function AppLayout({ children, title, subtitle, isLoading = false }) {
    const [open, toggle] = useToggle(false);
    const { token, clearToken } = useToken();
    const { push } = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);

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
                    <Button
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={(event) => setAnchorEl(event.currentTarget)}
                        color="inherit"
                    >
                        {token.sub}
                    </Button>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem onClick={async () => {
                            clearToken();
                            await push('/');
                        }}>Wyloguj</MenuItem>
                    </Menu>
                </Toolbar>
                <AppDrawer open={open} onClose={toggle}/>
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
                        {subtitle && <Box p={1} pb={3}><Typography variant="h5">{subtitle}</Typography></Box>}
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
