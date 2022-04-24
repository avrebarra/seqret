import * as React from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import { Link } from "react-router-dom";

import { useToast } from "@chakra-ui/react";
import { useClipboard } from "@chakra-ui/react";
import { useComponentSize } from "react-use-size";
import { Button } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

import config from "../config";

type Props = {
  size: number;
  value: string;
  onBackButtonClick?: () => void;
};

export const Display: React.FC<Props> = (props) => {
  // context, vars, and states
  const toast = useToast();

  const { ref, height, width } = useComponentSize();
  const [rawValue, setRawValue] = React.useState<string>("");
  const { hasCopied, onCopy } = useClipboard(rawValue);
  const [readiness, setReadiness] = React.useState<boolean>(false);

  // helper funcs
  const funcLoadData = async () => {
    setRawValue(props.value);
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
        <div className="w-full" ref={ref}>
          <QRCodeCanvas includeMargin={true} size={width} value={props.value} />
        </div>
      </div>
      <div className="mb-4">
        <Flex>
          <Input size={"sm"} borderRadius={0} value={rawValue} isReadOnly />
          <Button size={"sm"} borderRadius={0} onClick={onCopy}>
            {hasCopied ? "Copied" : "Copy"}
          </Button>
        </Flex>
      </div>
      <div className="flex flex-col space-y-2">
        <Button
          bg="black"
          size="lg"
          color="white"
          _hover={{ bg: "blackAlpha.800" }}
          borderRadius={0}
          onClick={props.onBackButtonClick}
        >
          Create Other
        </Button>
      </div>
    </>
  );
};
