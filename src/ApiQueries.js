export const getSchedule = (date) => () => fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/schedule?date=${date}`, {
    headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('impladent_access_token_v1')?.replaceAll('"', '')}`
    }
}).then(response => response.json());