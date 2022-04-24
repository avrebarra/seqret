import * as React from "react";

import { Select } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Textarea, Input } from "@chakra-ui/react";

import { QRConstruct } from "../services/qrutils";
import * as crypto from "../services/crypto.js";
import config from "../config";

type Props = {
  rawQR: string;
  onSecretOpenSuccess: (decsecret: string) => void;
  onSecretOpenError: (err: Error) => void;
};

export const OpenQR: React.FC<Props> = (p) => {
  // context, vars, and states
  const CRYPTO_ALGO_LIST = config.algorithms;

  const [QRData, setQRData] = React.useState<QRConstruct | null>();
  const [inputEncAlgorithm, setEncAlgorithm] = React.useState<string>("");
  const [inputPassphrase, setPassphrase] = React.useState<string>("");

  // helper funcs
  const funcLoadData = async () => {
    // parse construct
    const construct: QRConstruct = JSON.parse(p.rawQR);
    setQRData(construct);
  };
  const funcShowErr = async (msg: string) => {
    p.onSecretOpenError(new Error(msg));
  };
  const funcOnOpenSecret = async () => {
    // prep and
    if (!QRData?.secret)
      return funcShowErr("Fatal failure. Secret not read/detected.");
    if (!inputEncAlgorithm)
      return funcShowErr("Please choose encryption method to use.");
    if (!inputPassphrase)
      return funcShowErr("Please specify a secret key or passphrase.");

    // select encryptor
    const method = CRYPTO_ALGO_LIST.find((e) => e.id == inputEncAlgorithm);
    if (!method) return funcShowErr("Cannot find selected algorithm");

    // decrypt secret with key
    let secretDecrypted;
    try {
      secretDecrypted = method.funcDecrypt(inputPassphrase, QRData?.secret);
    } catch (error) {
      const errmsg = `Parsing errored. Are you sure your algorithm and key correct? Got error: ${error}`;
      return funcShowErr(errmsg);
    }
    if (secretDecrypted == "") {
      return funcShowErr(
        "Parsing failed. Are you sure your algorithm and key correct?"
      );
    }

    p.onSecretOpenSuccess(secretDecrypted);
  };

  // effects
  React.useEffect(() => {
    funcLoadData();
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-2">
        <Textarea
          value={"hints/notes: " + (QRData?.notes || "-")}
          disabled={true}
        />
        <Select
          borderRadius={0}
          placeholder="select encryption method"
          onChange={(e) => setEncAlgorithm(e.target.value)}
        >
          {CRYPTO_ALGO_LIST.map((v) => {
            return <option value={v.id}>{v.label}</option>;
          })}
        </Select>
        <Input
          borderRadius={0}
          value={inputPassphrase}
          onChange={(e) => setPassphrase(e.currentTarget.value)}
          placeholder="enter a passphrase"
          type="password"
        />
        <div>
          <Button
            bg="black"
            size="lg"
            color="white"
            _hover={{ bg: "blackAlpha.800" }}
            borderRadius={0}
            onClick={() => funcOnOpenSecret()}
          >
            Open Secret
          </Button>
        </div>
      </div>
    </>
  );
};
