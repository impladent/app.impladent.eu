import decode from 'jwt-decode';

const ACCESS_TOKEN_KEY = 'impladent_access_token_v1';

export function logout() {
    clearAccessToken();
    window.location = '/';
}

export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function isLoggedIn() {
    return !!getAccessToken() && !!isExpired();
}

export function isExpired() {
    return Date.now() < decode(getAccessToken()).exp * 1000;
}

export function getUserId() {
    return decode(getAccessToken()).sub;
}

export function getDisplayName() {
    return decode(getAccessToken()).displayName;
}

export function getUserScopes() {
    return decode(getAccessToken()).scopes;
}
