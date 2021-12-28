import * as React from "react";

import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import { Button } from "baseui/button";
import { Select, Value } from "baseui/select";

import { QRConstruct } from "../services/qrbuilder";
import * as algo from "../services/algomap";
import config from "../config";

type Props = {
  rawQR: string;
  onSecretOpenSuccess: (decsecret: string) => void;
  onSecretOpenError: (err: Error) => void;
};

export const OpenQR: React.FC<Props> = (p) => {
  // context, vars, and states
  const [readiness, setReadiness] = React.useState<boolean>(false);
  const [QRData, setQRData] = React.useState<QRConstruct | null>();
  const [inputAlg, setInputAlg] = React.useState<Value | undefined>(undefined);
  const [inputKey, setInputKey] = React.useState<string>("");

  const algolist = algo.algorithmMapping.map((e) => ({
    id: e.id,
    label: e.label,
  }));

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
    if (inputAlg == undefined)
      return funcShowErr("Please choose encryption method to use.");
    if (inputKey == "")
      return funcShowErr("Please specify a secret key or passphrase.");

    // select encryptor
    const alg = algo.algorithmMapping.find((e) => e.id == inputAlg[0].id);
    if (alg == undefined) return funcShowErr("Cannot find selected algorithm!");

    // decrypt secret with key
    let secretDecrypted;
    try {
      secretDecrypted = alg.funcDec({
        key: inputKey,
        encvalue: QRData?.secret,
      });
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
  }, [readiness]);

  return (
    <>
      <div className="flex flex-col space-y-2">
        <Textarea
          value={"hints/notes: " + (QRData?.notes || "-")}
          disabled={true}
        />
        <Select
          options={algolist}
          value={inputAlg}
          placeholder="select encryption method"
          onChange={(params) => setInputAlg(params.value)}
          clearable={false}
        />
        <Input
          value={inputKey}
          onChange={(e) => setInputKey(e.currentTarget.value)}
          placeholder="enter key or passphrase"
          type="password"
          clearOnEscape
        />
        <div>
          <Button onClick={() => funcOnOpenSecret()} size="large">
            Open Secret
          </Button>
        </div>
      </div>
    </>
  );
};
