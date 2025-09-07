import { invoke } from '@tauri-apps/api/core';

// Initialize the keyring service with a service name
async function initializeKeyring(serviceName) {
    return await invoke('plugin:keyring|initialize_keyring', {
        serviceName,
    });
}
// Password operations
async function setPassword(username, password) {
    return await invoke('plugin:keyring|set_password', {
        username,
        password,
    });
}
async function getPassword(username) {
    return await invoke('plugin:keyring|get_password', {
        username,
    });
}
async function deletePassword(username) {
    return await invoke('plugin:keyring|delete_password', {
        username,
    });
}
async function hasPassword(username) {
    return await invoke('plugin:keyring|has_password', {
        username,
    });
}
// Secret operations (for binary data)
async function setSecret(username, secret) {
    return await invoke('plugin:keyring|set_secret', {
        username,
        secret,
    });
}
async function getSecret(username) {
    return await invoke('plugin:keyring|get_secret', {
        username,
    });
}
async function deleteSecret(username) {
    return await invoke('plugin:keyring|delete_secret', {
        username,
    });
}
async function hasSecret(username) {
    return await invoke('plugin:keyring|has_secret', {
        username,
    });
}
// Convenience functions for common use cases
const keyring = {
    initialize: initializeKeyring,
    password: {
        set: setPassword,
        get: getPassword,
        delete: deletePassword,
        exists: hasPassword,
    },
    secret: {
        set: setSecret,
        get: getSecret,
        delete: deleteSecret,
        exists: hasSecret,
    },
};

export { keyring as default, deletePassword, deleteSecret, getPassword, getSecret, hasPassword, hasSecret, initializeKeyring, keyring, setPassword, setSecret };
