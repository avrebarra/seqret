import * as React from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Html5QrcodeResult, Html5QrcodeError } from "html5-qrcode/esm/core";

import config from "../config";

type Props = {
  onScanSuccess: (rawqr: string) => void;
};

export const ScanQR: React.FC<Props> = (p) => {
  // context, vars, and states
  const QR_READER_ID = "comp-qr-reader";
  const [readiness, setReadiness] = React.useState<boolean>(false);

  let scanner: Html5QrcodeScanner;

  // helper funcs
  const funcOnScanSuccess = (text: string, result: Html5QrcodeResult) => {
    try {
      // test if can be parsed as json
      JSON.parse(text);

      // fire hook
      p.onScanSuccess(text);

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
      { fps: 10, qrbox: { width: 250, height: 250 } },
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
      <div id={QR_READER_ID} className="w-full max-w-lg"></div>
    </>
  );
};
