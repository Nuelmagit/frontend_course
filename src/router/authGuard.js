const getUserFromLocalStorage = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return token && user ? { user: JSON.parse(user), token } : undefined;
}

export const isAuthenticatedGuard = (to, from, next) => {
    getUserFromLocalStorage() ? next() : next({ name: 'outside-login' })
}

export const isNotAuthenticatedGuard = (to, from, next) => {
    getUserFromLocalStorage() ? next("/") : next()
}