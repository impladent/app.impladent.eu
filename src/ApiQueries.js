import { ACCESS_TOKEN_KEY } from './providers/TokenProvider';

const token = window.localStorage.getItem(ACCESS_TOKEN_KEY)?.replaceAll('"', '');

export const getSchedule = (date) => () => fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/schedule?date=${date}`, {
    headers: { 'Authorization': `Bearer ${token}` }
}).then(response => response.json());

export const getLeaveTypes = () => fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/leave/types`, {
    headers: { 'Authorization': `Bearer ${token}` }
}).then(response => response.json());

export const submitLeave = ({ values }) => fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/leave`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(values)
}).then(async response => {
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;
    if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
    }
});

export const getUsers = () => fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/users`, {
    headers: { 'Authorization': `Bearer ${token}` }
}).then(response => response.json());

export function onMutationError(enqueueSnackbar, error) {
    return enqueueSnackbar('Wystąpił błąd!', { variant: 'error' });
}