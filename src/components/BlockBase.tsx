import * as React from "react";

import config from "../config";

type Props = {};

export const Base: React.FC<Props> = ({}) => {
  // context, vars, and states
  const [readiness, setReadiness] = React.useState<boolean>(false);

  // helper funcs
  const funcLoadData = async () => {};

  // effects
  React.useEffect(() => {
    funcLoadData();
  }, [readiness]);

  return <></>;
};
