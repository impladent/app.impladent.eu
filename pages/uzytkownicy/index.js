import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import * as React from 'react';
import { useQuery } from 'react-query';
import { getUsers } from '../../src/ApiQueries';
import { AppLayout } from '../../src/layouts/AppLayout';

export default function Users() {
    const { isLoading, data: users = [] } = useQuery(['users'], getUsers)

    return (
        <AppLayout isLoading={isLoading} title="Użytkownicy" subtitle="Użytkownicy aplikacji">
            <Table sx={{ minWidth: '100%' }} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Użytkownik</TableCell>
                        <TableCell>Login</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                            <TableRow key={user.username}>
                                <TableCell component="th" scope="row"><Typography
                                    variant="caption">{user.name} {user.lastName}</Typography></TableCell>
                                <TableCell><Typography variant="caption">{user.username}</Typography></TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </AppLayout>
    );
}
