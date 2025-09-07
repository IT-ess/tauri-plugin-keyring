'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@tauri-apps/api/core');

// Initialize the keyring service with a service name
async function initializeKeyring(serviceName) {
    return await core.invoke('plugin:keyring|initialize_keyring', {
        serviceName,
    });
}
// Password operations
async function setPassword(username, password) {
    return await core.invoke('plugin:keyring|set_password', {
        username,
        password,
    });
}
async function getPassword(username) {
    return await core.invoke('plugin:keyring|get_password', {
        username,
    });
}
async function deletePassword(username) {
    return await core.invoke('plugin:keyring|delete_password', {
        username,
    });
}
async function hasPassword(username) {
    return await core.invoke('plugin:keyring|has_password', {
        username,
    });
}
// Secret operations (for binary data)
async function setSecret(username, secret) {
    return await core.invoke('plugin:keyring|set_secret', {
        username,
        secret,
    });
}
async function getSecret(username) {
    return await core.invoke('plugin:keyring|get_secret', {
        username,
    });
}
async function deleteSecret(username) {
    return await core.invoke('plugin:keyring|delete_secret', {
        username,
    });
}
async function hasSecret(username) {
    return await core.invoke('plugin:keyring|has_secret', {
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

exports.default = keyring;
exports.deletePassword = deletePassword;
exports.deleteSecret = deleteSecret;
exports.getPassword = getPassword;
exports.getSecret = getSecret;
exports.hasPassword = hasPassword;
exports.hasSecret = hasSecret;
exports.initializeKeyring = initializeKeyring;
exports.keyring = keyring;
exports.setPassword = setPassword;
exports.setSecret = setSecret;
