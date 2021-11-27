import InboxIcon from '@mui/icons-material/Inbox';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import * as React from 'react';
import { useQuery } from 'react-query';
import { getUsers } from '../src/ApiQueries';
import { AppLayout } from '../src/AppLayout';

export default function Appointments() {
    const { isLoading, isError, data, error } = useQuery('users', getUsers)
    if (isLoading) return <p>ładowanie...</p>;

    return (
        <AppLayout isLoading={isLoading}>
            <List>
                {data.entries.map((entry, i) => (
                    <ListItem disablePadding key={i}>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon/>
                            </ListItemIcon>
                            <ListItemText primary={entry.patient} secondary={entry.localDate}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </AppLayout>
    );
}
