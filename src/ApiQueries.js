let token = '';
if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('impladent_access_token_v1')?.replaceAll('"', '');
}

const options = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
};

export const getUsers = () => fetch('http://localhost:8080/schedule?id=7', options).then(response => response.json());