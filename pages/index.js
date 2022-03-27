import { DatePicker } from '@mui/lab';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { format, formatDuration, intervalToDuration } from 'date-fns'
import { pl } from 'date-fns/locale'
import * as React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getSchedule } from '../src/ApiQueries';
import { AppointmentsTimeline } from '../src/components/AppointmentsTimeline';
import { AppLayout } from '../src/layouts/AppLayout';

export default function Appointments() {

    const [state, setState] = useState((prev) => {
            const reportDate = new URLSearchParams(document.location.search).get('date') ? new Date(new URLSearchParams(document.location.search.substring(1)).get('date')) : new Date();
            return { reportDate, lastDate: prev ? prev.reportDate : reportDate };
        }
    );

    const {
        isLoading,
        data = []
    } = useQuery(['schedule', format(state.reportDate, 'yyyy-MM-dd')], getSchedule(format(state.reportDate, 'yyyy-MM-dd')))

    return (
        <AppLayout isLoading={isLoading} title="Moje wizyty" subtitle={`Dzisiejsze wizyty: ${data.entries.length}`}>
            <Box px={1} mt={1}><DateSelector onChange={updateDate} value={state.reportDate}/></Box>
            <AppointmentsTimeline data={data.entries}/>
        </AppLayout>
    );

    function updateDate(date) {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('date', format(date, 'yyyy-MM-dd'))
        window.history.replaceState({}, '', `${window.location.pathname}?${queryParams}`);
        setState((prev) => ({ reportDate: date, lastDate: prev.reportDate }));
    }
}

function DateSelector({ onChange, value }) {
    return (
        <DatePicker value={value} onChange={onChange} disableCloseOnSelect={false} label="Wybierz datę"
                    showTodayButton={true} renderInput={(params) => <TextField fullWidth {...params} />}/>
    );
}

function getDuration(start, end) {
    return formatDuration(intervalToDuration({
        start: new Date(start),
        end: new Date(end)
    }), { locale: pl });
}
