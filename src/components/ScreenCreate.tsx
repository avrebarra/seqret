import * as React from "react";
import { Link } from "react-router-dom";
import * as QRCode from "qrcode.react";
import * as crypto from "crypto-js";

import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { Textarea } from "baseui/textarea";
import { Select, Value } from "baseui/select";
import { Slider } from "baseui/slider";
import { Modal, ModalBody } from "baseui/modal";
import { ErrorModal } from "./BlockErrorModal";
import { ScreenTitle } from "./BlockScreenTitle";

import config from "../config";

type Props = {};

export const Create: React.FC<Props> = ({}) => {
  // context, vars, and states
  const DEFAULT_QR_SIZE = 256;

  const [readiness, setReadiness] = React.useState<boolean>(false);
  const [errstr, setErrstr] = React.useState<string>("");
  const [stateShowQR, setStateShowQR] = React.useState<boolean>(false);
  const [inputAlg, setAlg] = React.useState<Value | undefined>(undefined);
  const [inputSecret, setInputSecret] = React.useState<string>("");
  const [inputNotes, setInputNotes] = React.useState<string>("");
  const [inputKey, setKey] = React.useState<string>("");
  const [inputSize, setInputSize] = React.useState<number[]>([DEFAULT_QR_SIZE]);
  const [outputQRString, setOutputQRString] = React.useState<string>("");

  const algorithms = [
    {
      id: "AESCBC",
      label: "AES-CBC",
      func: (p: { value: string; key: string }): string => {
        var out = crypto.AES.encrypt(p.value, p.key, {
          mode: crypto.mode.CBC,
        });
        return out.toString();
      },
    },
    {
      id: "AESECB",
      label: "AES-ECB",
      func: (p: { value: string; key: string }): string => {
        var out = crypto.AES.encrypt(p.value, p.key, {
          mode: crypto.mode.ECB,
        });
        return out.toString();
      },
    },
  ];

  // helper funcs
  const funcLoadData = async () => {};
  const funcShowErr = async (errormsg: string) => {
    console.log(errormsg);
    setErrstr(errormsg);
  };
  const funcGenerateQR = async () => {
    // prep and
    if (inputAlg == undefined)
      return funcShowErr("Please choose an algorithm to use.");
    if (inputSecret == "")
      return funcShowErr("Please specify secret to encode.");
    if (inputKey == "")
      return funcShowErr("Please specify a secret key or passphrase.");

    // select encryptor
    const alg = algorithms.find((e) => e.id == inputAlg[0].id);
    if (alg == undefined) return funcShowErr("Cannot find selected algorithm!");

    // encrypt secret with key
    const secretenc = alg.func({ key: inputKey, value: inputSecret });

    // build complete string
    const qrstr = `${inputNotes}|유/匷|${secretenc}`;
    setOutputQRString(qrstr);

    // show modal
    setStateShowQR(true);
  };

  // effects
  React.useEffect(() => {
    funcLoadData();
  }, [readiness]);

  return (
    <>
      <ScreenTitle title="create" subtitle="create a new secret" />
      <div className="flex flex-col space-y-2">
        <Select
          options={algorithms}
          value={inputAlg}
          placeholder="select algorithm"
          onChange={(params) => setAlg(params.value)}
        />
        <Textarea
          clearable={true}
          value={inputSecret}
          onChange={(e) => setInputSecret(e.currentTarget.value)}
          placeholder="enter your secrets here"
          clearOnEscape
        />
        <Input
          value={inputKey}
          onChange={(e) => setKey(e.currentTarget.value)}
          placeholder="enter key or passphrase"
          clearOnEscape
        />
        <Input
          clearable={true}
          value={inputNotes}
          onChange={(e) => setInputNotes(e.currentTarget.value)}
          placeholder="add hint or notes (optional)"
          clearOnEscape
        />
        <Slider
          value={inputSize}
          min={64}
          max={512}
          step={64}
          marks
          onChange={({ value }) => value && setInputSize(value)}
          valueToLabel={(value) => `${value}px`}
        />

        <div>
          <Link className="hover:text-neutral-900" to="/create">
            <Button onClick={() => funcGenerateQR()} size="large">
              Create QR Code
            </Button>
          </Link>
        </div>

        {/* modals */}

        <ErrorModal
          message={errstr}
          shown={errstr != ""}
          onClose={() => setErrstr("")}
        />

        <div>
          <Modal
            animate={true}
            size="auto"
            closeable={false}
            onClose={() => setStateShowQR(false)}
            isOpen={stateShowQR}
          >
            <ModalBody>
              <div className="text-center">
                <div className="flex flex-col space-y-2 p-10">
                  <QRCode size={inputSize[0]} value={outputQRString} />
                </div>
                <br />
                <Button onClick={() => setStateShowQR(false)}>
                  Back to Creator
                </Button>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </>
  );
};