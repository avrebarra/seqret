import * as React from "react";

import config from "../config";

type Props = {};

export const Footer: React.FC<Props> = ({}) => {
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
      <div className="footer mb-4 text-sm text-gray-400">
        <div className="mb-3">
          <div> made with, um fingers, by @avrébarra</div>
          <div> check github repository</div>
        </div>
      </div>
    </>
  );
};
