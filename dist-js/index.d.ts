export type CredentialType = 'Password' | 'Secret';
export interface CredentialValue {
    type: 'Password' | 'Secret';
    data: string | number[];
}
export declare function initializeKeyring(serviceName: string): Promise<void>;
export declare function setPassword(username: string, password: string): Promise<void>;
export declare function getPassword(username: string): Promise<string>;
export declare function deletePassword(username: string): Promise<void>;
export declare function hasPassword(username: string): Promise<boolean>;
export declare function setSecret(username: string, secret: number[]): Promise<void>;
export declare function getSecret(username: string): Promise<number[]>;
export declare function deleteSecret(username: string): Promise<void>;
export declare function hasSecret(username: string): Promise<boolean>;
export declare const keyring: {
    initialize: typeof initializeKeyring;
    password: {
        set: typeof setPassword;
        get: typeof getPassword;
        delete: typeof deletePassword;
        exists: typeof hasPassword;
    };
    secret: {
        set: typeof setSecret;
        get: typeof getSecret;
        delete: typeof deleteSecret;
        exists: typeof hasSecret;
    };
};
export default keyring;
