import { TimelineOppositeContent } from '@mui/lab';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { green } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { format, formatDuration, intervalToDuration, isAfter } from 'date-fns';
import { pl } from 'date-fns/locale';
import React from 'react';

export function AppointmentsTimeline({ data = [] }) {
    return (
        <Timeline align="left" sx={{p: 0}}>
            {data.map((item, i) => renderTimeLineItem(item, i))}
        </Timeline>
    );

    function renderTimeLineItem(item, key) {
        return (
            <TimelineItem key={`${item.start}-${item.end}-${key}`}>
                <TimelineOppositeContent style={{ flex: 0, minWidth: 80 }}>
                    <Typography color="textSecondary">
                        {format(new Date(item.start), 'HH:mm', { locale: pl })}
                    </Typography>
                    <small style={{ fontSize: 10 }}>{getDuration(item.start, item.end)}</small>
                </TimelineOppositeContent>
                <PatientEntry item={item}/>
            </TimelineItem>
        )
    }

    function PatientEntry({ item }) {
        return (
            <React.Fragment>
                <TimelineSeparator>
                    <TimelineDot style={{ backgroundColor: isAfter(new Date(), new Date(item.end)) ? green[200] : '' }}/>
                    <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent>
                    <Typography variant="body2" color="primary" style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        {item.patient}
                    </Typography>
                    <Typography variant="caption">
                        <small style={{ fontSize: 10 }}>{item.comment}</small>
                    </Typography>
                </TimelineContent>
            </React.Fragment>
        );
    }
}

function getDuration(start, end) {
    return formatDuration(intervalToDuration({
        start: new Date(start),
        end: new Date(end)
    }), { locale: pl });
}


