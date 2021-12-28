import * as React from "react";
import * as QRCode from "qrcode.react";

import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { Textarea } from "baseui/textarea";
import { Select, Value } from "baseui/select";
import { Slider } from "baseui/slider";
import { Modal, ModalBody } from "baseui/modal";
import { ErrorModal } from "./BlockErrorModal";
import { ScreenTitle } from "./BlockScreenTitle";

import * as qrbuilder from "../services/qrbuilder";
import * as algo from "../services/algomap";
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

  const algolist = algo.algorithmMapping.map((e) => ({
    id: e.id,
    label: e.label,
  }));

  // helper funcs
  const funcLoadData = async () => {};
  const funcShowErr = async (errormsg: string) => {
    console.log(errormsg);
    setErrstr(errormsg);
  };
  const funcGenerateQR = async () => {
    // prep and
    if (inputAlg == undefined)
      return funcShowErr("Please choose encryption method to use.");
    if (inputSecret == "")
      return funcShowErr("Please specify secret to encode.");
    if (inputKey == "")
      return funcShowErr("Please specify a secret key or passphrase.");

    // select encryptor
    const alg = algo.algorithmMapping.find((e) => e.id == inputAlg[0].id);
    if (alg == undefined) return funcShowErr("Cannot find selected algorithm!");

    // encrypt secret with key
    const secretenc = alg.funcEnc({ key: inputKey, value: inputSecret });

    // build complete string
    const qrstr = qrbuilder.constructQRString({
      notes: inputNotes,
      secret: secretenc,
    });
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
          options={algolist}
          value={inputAlg}
          placeholder="select encryption method"
          onChange={(params) => setAlg(params.value)}
          clearable={false}
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
          placeholder="enter securing key or passphrase"
          type="password"
          clearOnEscape
        />
        <Input
          value={inputNotes}
          onChange={(e) => setInputNotes(e.currentTarget.value)}
          placeholder="add public hint or notes (optional)"
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
          <Button onClick={() => funcGenerateQR()} size="large">
            Create QR Code
          </Button>
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
            closeable={true}
            onClose={() => setStateShowQR(false)}
            isOpen={stateShowQR}
          >
            {/* hack to distract autofocus from input */}
            <a href="http://"></a>

            <Input
              startEnhancer="[QR]"
              placeholder="Untitled QR"
              autoFocus={false}
            />
            <ModalBody>
              <div className="flex flex-col space-y-2 text-center items-center">
                <span className="p-5">
                  <QRCode size={inputSize[0]} value={outputQRString} />
                </span>
              </div>
            </ModalBody>
            <div
              className="bg-black text-slate-50 text-lg text-center p-5 cursor-pointer"
              onClick={() => setStateShowQR(false)}
            >
              Back to Creator
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};
