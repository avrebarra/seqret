import * as encrypt from "../services/encryptor";

export const algorithmMapping = [
  {
    id: "AESCBC",
    label: "Standard AES-CBC",
    funcEnc: (p: { value: string; key: string }): string => {
      return encrypt.encryptAESCBC(p.key, p.value);
    },
    funcDec: (p: { encvalue: string; key: string }): string => {
      return encrypt.decryptAESCBC(p.key, p.encvalue);
    },
  },
  {
    id: "AESECB",
    label: "Standard AES-ECB",
    funcEnc: (p: { value: string; key: string }): string => {
      return encrypt.encryptAESECB(p.key, p.value);
    },
    funcDec: (p: { encvalue: string; key: string }): string => {
      return encrypt.decryptAESECB(p.key, p.encvalue);
    },
  },
];
