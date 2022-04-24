import * as React from "react";

import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";

import config from "../config";

type Props = {
  secret: string;
  onBackButtonClick: () => void;
};

export const ShowSecret: React.FC<Props> = (props) => {
  // context, vars, and states
  const [readiness, setReadiness] = React.useState<boolean>(false);
  const [secret, setSecret] = React.useState<string>(props.secret);

  // helper funcs
  const funcLoadData = async () => {};

  // effects
  React.useEffect(() => {
    funcLoadData();
  }, [readiness]);

  return (
    <>
      <div className="flex flex-col space-y-2">
        <Textarea readOnly={true} value={secret} />
        <div>
          <Link to="/">
            <Button
              bg="black"
              size="lg"
              color="white"
              _hover={{ bg: "blackAlpha.800" }}
              borderRadius={0}
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
