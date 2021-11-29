let token = '';
if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('impladent_access_token_v1')?.replaceAll('"', '');
}

const options = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
};

export const getSchedule = (day, month, year) => () => fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/schedule?day=${day}&month=${month}&year=${year}`, options).then(response => response.json());