import * as React from "react";
import { Link } from "react-router-dom";

import config from "../config";

type Props = {
  title: string;
  subtitle: string;
};

export const ScreenTitle: React.FC<Props> = (params) => {
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
      <div className=" text-4xl ">
        <Link className="text-gray-500 font-semibold" to="/">
          seqret
        </Link>
        /<span className="font-bold">{params.title}</span>
      </div>
      <div className="text-2xl">{params.subtitle}</div>
      <br />
    </>
  );
};
