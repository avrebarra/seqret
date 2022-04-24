import * as React from "react";
import { Link } from "react-router-dom";

import { Button } from "@chakra-ui/react";
import { UnlockIcon } from "@chakra-ui/icons";

import config from "../config";

type Props = {};

export const Home: React.FC<Props> = ({}) => {
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
      {/* <div className="font-bold text-4xl">🙈</div> */}
      <img
        className="w-16"
        src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/facebook/65/see-no-evil-monkey_1f648.png"
        alt=""
      />
      <div className="font-bold text-4xl">
        <Link className="" to={`/`}>
          seqret
        </Link>
      </div>
      <div className="text-2xl">
        keep a secret{" "}
        <span className="font-light text-xl font-mono bg-red-200">
          _0rP4s$w0rdz?_
        </span>{" "}
        <br /> as a protected QR code.
      </div>
      <br />
      <div>
        <Link to={`/create`}>
          <Button
            bg="black"
            size="lg"
            color="white"
            _hover={{ bg: "blackAlpha.800" }}
            borderRadius={0}
          >
            Create New
          </Button>
        </Link>
      </div>
      <div>
        <Link to={`/scan`}>
          <Button
            bg="black"
            size="lg"
            color="white"
            _hover={{ bg: "blackAlpha.800" }}
            borderRadius={0}
          >
            Read From QR Code
          </Button>
        </Link>
      </div>
      <div>
        <Link to={`/faqs`}>
          <Button colorScheme="gray" size={"lg"} borderRadius={0}>
            Open the FAQs
          </Button>
        </Link>
      </div>
    </>
  );
};
