import * as crypto from "./services/crypto";

const CONFIG = {
  algorithms: [
    {
      id: "AESCBC",
      label: "Standard AES-CBC",
      funcEncrypt: crypto.encryptAESCBC,
      funcDecrypt: crypto.decryptAESCBC,
    },
    {
      id: "AESECB",
      label: "Standard AES-ECB",
      funcEncrypt: crypto.encryptAESECB,
      funcDecrypt: crypto.decryptAESECB,
    },
  ],
};

export default CONFIG;
