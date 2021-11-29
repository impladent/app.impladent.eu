import PersonIcon from '@mui/icons-material/Person';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { format, formatDuration, intervalToDuration } from 'date-fns'
import { pl } from 'date-fns/locale'
import * as React from 'react';
import { useQuery } from 'react-query';
import { getSchedule } from '../src/ApiQueries';
import { AppLayout } from '../src/layouts/AppLayout';

export default function Appointments() {
    const today = new Date();
    const {
        isLoading,
        isError,
        data,
        error
    } = useQuery('users', getSchedule(today.getDate(), today.getMonth() + 1, today.getFullYear()))

    return (
        <AppLayout isLoading={isLoading} title="Moje wizyty" subtitle="Dzisiejsze wizyty:">
            <List>
                {data?.entries.map((entry, i) => (
                    <ListItem disablePadding key={i}>
                        <ListItemButton>
                            <ListItemIcon>
                                <PersonIcon/>
                            </ListItemIcon>
                            <ListItemText primary={entry.patient}
                                          secondary={`${format(new Date(entry.start), 'HH:mm', { locale: pl })} - ${format(new Date(entry.end), 'HH:mm', { locale: pl })} (${getDuration(entry.start, entry.end)})`}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </AppLayout>
    );
}


function getDuration(start, end) {
    return formatDuration(intervalToDuration({
        start: new Date(start),
        end: new Date(end)
    }), { locale: pl });
}
