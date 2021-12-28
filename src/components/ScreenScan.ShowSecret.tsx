import * as React from "react";

import { Link } from "react-router-dom";
import { Textarea } from "baseui/textarea";
import { Button } from "baseui/button";

import config from "../config";

type Props = {
  secret: string;
  onBackButtonClick: () => void;
};

export const ShowSecret: React.FC<Props> = (p) => {
  // context, vars, and states
  const [readiness, setReadiness] = React.useState<boolean>(false);
  const [secret] = React.useState<string>(p.secret);

  // helper funcs
  const funcLoadData = async () => {};

  // effects
  React.useEffect(() => {
    funcLoadData();
  }, [readiness]);

  return (
    <>
      <div className="flex flex-col space-y-2">
        <Textarea value={secret} />
        <div>
          <Button
            kind="primary"
            onClick={() => p.onBackButtonClick()}
            size="large"
          >
            Previous Menu
          </Button>

          <Link to="/scan">
            <Button kind="secondary" size="large">
              Scan Other QR
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
