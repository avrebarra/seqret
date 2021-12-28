import * as React from "react";

import CONFIG from "../config";

type Props = {};

export const ScanRead: React.FC<Props> = ({}) => {
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
      <div className="font-bold text-4xl">seqret/read</div>
      <div className="text-2xl">scan secret from qr</div>
    </>
  );
};
