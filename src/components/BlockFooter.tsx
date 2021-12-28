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
      <div className="text-gray-400">. . . . . . . . </div>
      <div className="footer mb-4 text-sm text-gray-400">
        <div className="mb-3">
          <div>
            made using, um fingers, by
            <a href="https://avrebarra.github.io/"> @avrébarra</a>
          </div>
          <div>
            <a href="https://github.com/avrebarra/seqret">
              check out github repository
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
