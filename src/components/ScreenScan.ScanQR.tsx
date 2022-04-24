import * as React from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import {
  Html5QrcodeResult,
  Html5QrcodeError,
  Html5QrcodeScanType,
} from "html5-qrcode/esm/core";

import { Input, Flex, Button } from "@chakra-ui/react";

import config from "../config";

type Props = {
  onScanSuccess: (rawqr: string) => void;
};

export const ScanQR: React.FC<Props> = (props) => {
  // context, vars, and states
  const QR_READER_ID = "comp-qr-reader";

  const [rawValue, setRawValue] = React.useState<string>("");
  const [readiness, setReadiness] = React.useState<boolean>(false);

  let scanner: Html5QrcodeScanner;

  // helper funcs
  const funcOnScanSuccess = (text: string, result: Html5QrcodeResult) => {
    try {
      // test if can be parsed as json
      JSON.parse(text);

      // fire hook
      props.onScanSuccess(text);

      // pause reader
      scanner.clear();

      return;
    } catch (error) {
      // do nothing on non json parsable qr
    }
  };
  const funcOnScanFailure = (errorMessage: string, error: Html5QrcodeError) => {
    // do nothing and continue scanning
  };
  const funcLoadComponent = async () => {
    // render qr scanner
    scanner = new Html5QrcodeScanner(
      QR_READER_ID,
      {
        supportedScanTypes: [
          Html5QrcodeScanType.SCAN_TYPE_CAMERA,
          Html5QrcodeScanType.SCAN_TYPE_FILE,
        ],
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );
    scanner.render(funcOnScanSuccess, funcOnScanFailure);
  };

  // effects
  React.useEffect(() => {
    // load component
    funcLoadComponent();

    // clean up
    return () => {
      if (scanner) scanner.clear();
    };
  }, [readiness]);

  return (
    <>
      <div id={QR_READER_ID} className="w-full max-w-lg mb-4"></div>
      <Flex>
        <Input
          placeholder="Or enter raw QR text here"
          size={"lg"}
          borderRadius={0}
          onChange={(e) => {
            setRawValue(e.target.value);
          }}
        />
        <Button
          bg="black"
          size="lg"
          color="white"
          _hover={{ bg: "blackAlpha.800" }}
          borderRadius={0}
          onClick={() => {
            props.onScanSuccess(rawValue);
          }}
        >
          Parse
        </Button>
      </Flex>
    </>
  );
};
