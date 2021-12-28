import * as React from "react";

import { Modal, ModalBody } from "baseui/modal";
import { Button } from "baseui/button";

import CONFIG from "../config";

type Props = {
  message: string;
  shown: boolean;
  onClose: () => void;
};

export const ErrorModal: React.FC<Props> = ({
  message,
  shown: inputShown,
  onClose,
}) => {
  // context, vars, and states
  const [readiness, setReadiness] = React.useState<boolean>(false);
  const [shown, setShown] = React.useState<boolean>(false);

  // helper funcs
  const funcLoadData = async () => {};

  // effects
  React.useEffect(() => {
    setShown(inputShown);
  }, [inputShown]);

  return (
    <div>
      <Modal
        animate={true}
        size="auto"
        closeable={false}
        onClose={onClose}
        isOpen={shown}
      >
        <ModalBody>
          <div>
            <br />
            <div className="text-xl font-semibold mb-2">
              Hmm, something's wrong
            </div>
            <div className="text-base mb-4">{message}</div>
            <Button onClick={onClose}>Go Back</Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};
