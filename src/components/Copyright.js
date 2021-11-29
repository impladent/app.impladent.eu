import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function Copyright() {
    return (
        <Box p={2} component="footer">
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                <MuiLink color="inherit" href="https://impladent.eu/">
                    impladent.eu
                </MuiLink>
            </Typography>
        </Box>
    );
}
