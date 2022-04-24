import * as React from "react";

import { useToast } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Textarea, Input } from "@chakra-ui/react";

import * as qrutils from "../services/qrutils";
import * as crypto from "../services/crypto";
import config from "../config";

export type CreateFormData = {
  methodId: string;
  secret: string;
  passphrase: string;
  notes?: string;
};

type Props = {
  encryptMethods: { id: string; label: string }[];
  onCompletedData?: (data: CreateFormData) => {};
};

export const CreateForm: React.FC<Props> = (props) => {
  // context, vars, and states

  const toast = useToast();
  const [readiness, setReadiness] = React.useState<boolean>(false);
  const [inputEncAlgorithm, setEncAlgorithm] = React.useState<string>("");
  const [inputSecret, setInputSecret] = React.useState<string>("");
  const [inputPassphrase, setPassphrase] = React.useState<string>("");
  const [inputNotes, setInputNotes] = React.useState<string>("");

  // helper funcs
  const funcLoadData = async () => {};
  const funcSubmitData = async () => {
    const data: CreateFormData = {
      methodId: inputEncAlgorithm,
      secret: inputSecret,
      passphrase: inputPassphrase,
      notes: inputNotes,
    };

    // validate
    if (!data.methodId) {
      return funcShowErr("Please choose encryption method");
    }
    if (!data.secret) {
      return funcShowErr("Please enter the secret to encrypt");
    }
    if (!data.passphrase) {
      return funcShowErr("Can't process without passphrase");
    }

    // submit
    if (props.onCompletedData) props.onCompletedData(data);
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
      <div className="flex flex-col space-y-2">
        <Select
          borderRadius={0}
          placeholder="select encryption method"
          onChange={(e) => setEncAlgorithm(e.target.value)}
        >
          {props.encryptMethods.map((v) => {
            return <option value={v.id}>{v.label}</option>;
          })}
        </Select>
        <Textarea
          borderRadius={0}
          value={inputSecret}
          onChange={(e) => setInputSecret(e.currentTarget.value)}
          placeholder="type your secrets here"
        />
        <Input
          borderRadius={0}
          value={inputPassphrase}
          onChange={(e) => setPassphrase(e.currentTarget.value)}
          placeholder="enter a passphrase"
          type="password"
        />
        <Input
          borderRadius={0}
          value={inputNotes}
          onChange={(e) => setInputNotes(e.currentTarget.value)}
          placeholder="add public hint or notes (optional)"
        />
        <div>
          <Button
            bg="black"
            size="lg"
            color="white"
            _hover={{ bg: "blackAlpha.800" }}
            borderRadius={0}
            onClick={funcSubmitData}
          >
            Create QR Code
          </Button>
        </div>
      </div>
    </>
  );
};
