export const getSessionStorage = (key) => {
    return JSON.parse(window.sessionStorage.getItem(key))
}

export const setSessionStorage = (key, value) => {
    return window.sessionStorage.setItem(key, JSON.stringify(value))
}

export const clearSessionStorage = () => {
    window.sessionStorage.clear();
}

export const getLocalStorage = (key) => {
    return JSON.parse(window.localStorage.getItem(key))
}

export const setLocalStorage = (key, value) => {
    return window.localStorage.setItem(key, JSON.stringify(value))
}

export const clearLocalStorage = () => {
    window.localStorage.clear();
}
