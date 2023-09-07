import { getCookie, setCookie } from 'cookies-next'
import { encrypt, decrypt } from 'crypto-js/aes';
import { enc } from 'crypto-js';
const apiMode = import.meta.env.VITE_API_MODE;


const secretKey = import.meta.env.VITE_KEY;

// Encrypt the data and set the encrypted value in the cookie
export const setEncryptedCookie = (name, value, res) => {
  const encryptedValue = encrypt(JSON.stringify(value), secretKey).toString();
  setCookie(name, encryptedValue, {
    httpOnly: false,
    secure: apiMode === 'production', // Use `true` for HTTPS only
  });
};

// Decrypt the cookie value
export const getDecryptedCookie = (name, req) => {
  const encryptedValue = getCookie(name);
  if (encryptedValue) {
    const decryptedValue = decrypt(decodeURIComponent(encryptedValue), secretKey).toString(enc.Utf8);
    return JSON.parse(decryptedValue);
  }
  return null;
};
