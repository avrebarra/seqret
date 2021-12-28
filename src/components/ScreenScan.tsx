import * as React from "react";

import { ScreenTitle } from "./BlockScreenTitle";

import config from "../config";

type Props = {};

export const Scan: React.FC<Props> = ({}) => {
  // context, vars, and states
  const [readiness, setReadiness] = React.useState<boolean>(false);

  // helper funcs
  const funcLoadData = async () => {};

  // effects
  React.useEffect(() => {
    funcLoadData();
  }, [readiness]);

  return (
    <>
      <ScreenTitle title="scan" subtitle="scan secret from a qr" />
      <div className="text-xl font-light">
        sorry, the scan function is still on development. <br />
        stay tuned.
      </div>
    </>
  );
};
