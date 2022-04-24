import * as React from "react";
import { useToast } from "@chakra-ui/react";

import { ScreenTitle } from "./BlockScreenTitle";
import { CreateForm, CreateFormData } from "./ScreenCreate.Form";
import { Display } from "./ScreenCreate.Display";

import * as qrutils from "../services/qrutils";
import * as crypto from "../services/crypto";
import config from "../config";

type Props = {};

export const Create: React.FC<Props> = ({}) => {
  // context, vars, and states
  const DEFAULT_QR_SIZE = 256;
  const CRYPTO_ALGO_LIST = config.algorithms;

  const toast = useToast();
  const [readiness, setReadiness] = React.useState<boolean>(false);
  const [rawQR, setRawQR] = React.useState<string>("");

  // helper funcs
  const funcLoadData = async () => {};
  const funcGenerateQR = async (data: CreateFormData) => {
    // select encryptor
    const method = CRYPTO_ALGO_LIST.find((e) => e.id == data.methodId);
    if (method == undefined)
      return funcShowErr("Cannot find selected algorithm");

    // encrypt secret with key
    const encryptedSecret = method.funcEncrypt(data.passphrase, data.secret);

    // build complete string
    const rawQR = qrutils.constructQRString({
      notes: data.notes || "",
      secret: encryptedSecret,
    });

    setRawQR(rawQR);
  };
  const funcShowErr = async (msg: string) => {
    toast({
      title: "Invalid Input Data",
      description: msg,
      status: "error",
      duration: 3000,
      position: "top",
      isClosable: true,
    });
  };

  // effects
  React.useEffect(() => {
    funcLoadData();
  }, [readiness]);

  return (
    <>
      <ScreenTitle title="create" subtitle="create a new secret" />

      {/* show create form */}
      {!rawQR ? (
        <CreateForm
          encryptMethods={CRYPTO_ALGO_LIST.map((e) => {
            return { id: e.id, label: e.label };
          })}
          onCompletedData={funcGenerateQR}
        />
      ) : null}

      {/* show display page */}
      {rawQR ? (
        <Display
          size={DEFAULT_QR_SIZE}
          value={rawQR}
          onBackButtonClick={() => {
            setRawQR("");
          }}
        />
      ) : null}
    </>
  );
};
