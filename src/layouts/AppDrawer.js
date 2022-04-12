import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import * as React from 'react';
import logo from '../../public/logo.svg';

export function AppDrawer({ open, onClose }) {
    const { push } = useRouter();

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <Box p={3} pt={5} textAlign="center">
                <img src={logo.src} alt="logo" style={{ width: 200, height: 50 }}/>
            </Box>
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={onClose}
                onKeyDown={onClose}
            >
                <List>
                    <ListItemButton>
                        <ListItemIcon>
                            <PersonIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Wizyty" onClick={async () => await push('/')}/>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <CalendarMonthIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Urlopy" onClick={async () => await push('/urlopy')}/>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <PeopleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Użytkownicy" onClick={async () => await push('/uzytkownicy')}/>
                    </ListItemButton>
                </List>
            </Box>
        </Drawer>
    );
}