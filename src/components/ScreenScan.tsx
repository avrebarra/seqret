import * as React from "react";

import { toaster, ToasterContainer } from "baseui/toast";
import { ScreenTitle } from "./BlockScreenTitle";
import { ScanQR } from "./ScreenScan.ScanQR";
import { OpenQR } from "./ScreenScan.OpenQR";
import { ShowSecret } from "./ScreenScan.ShowSecret";

import config from "../config";

type Props = {};

export const Scan: React.FC<Props> = ({}) => {
  // context, vars, and states
  const [readiness, setReadiness] = React.useState<boolean>(false);
  const [rawQR, setRawQR] = React.useState<string>("");
  const [rawSecret, setRawSecret] = React.useState<string>("");

  // helper funcs
  const funcShowErr = async (msg: string) => {
    toaster.negative(msg, {});
  };
  const funcLoad = async () => {};

  // effects
  React.useEffect(() => {
    funcLoad();
  }, [readiness]);

  return (
    <>
      <ToasterContainer />
      <ScreenTitle title="scan" subtitle="scan secret from a qr" />

      {/* show scan qr */}
      {!rawSecret && !rawQR ? (
        <ScanQR
          onScanSuccess={(scanresult) => {
            setRawQR(scanresult);
          }}
        />
      ) : null}

      {/* show open qr */}
      {rawQR ? (
        // hide using css if secret already read
        <div className={rawSecret ? "hidden" : ""}>
          <OpenQR
            rawQR={rawQR}
            onSecretOpenSuccess={(openres) => {
              setRawSecret(openres);
            }}
            onSecretOpenError={(e) => funcShowErr(e.message)}
          />
        </div>
      ) : null}

      {/* show show secret */}
      {rawSecret ? (
        <ShowSecret
          secret={rawSecret}
          onBackButtonClick={() => {
            setRawSecret(""); // clear raw secret
          }}
        />
      ) : null}
    </>
  );
};
