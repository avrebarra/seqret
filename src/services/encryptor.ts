import * as crypto from "crypto-js";

// AES CBC
export const encryptAESCBC = (key: string, value: string): string => {
  return crypto.AES.encrypt(value, key, { mode: crypto.mode.CBC }).toString();
};

export const decryptAESCBC = (key: string, enc: string): string => {
  return crypto.AES.decrypt(enc, key, { mode: crypto.mode.CBC }).toString();
};

// AES ECB
export const encryptAESECB = (key: string, value: string): string => {
  return crypto.AES.encrypt(value, key, { mode: crypto.mode.ECB }).toString();
};

export const decryptAESECB = (key: string, enc: string): string => {
  return crypto.AES.decrypt(enc, key, { mode: crypto.mode.ECB }).toString();
};
