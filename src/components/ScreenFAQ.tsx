import * as React from "react";

import { ScreenTitle } from "./BlockScreenTitle";

import config from "../config";

type Props = {};

export const FAQ: React.FC<Props> = ({}) => {
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
      <ScreenTitle title="faqs" subtitle="frobably asked questions" />

      <div className="mb-5">
        <div className="text-lg font-bold mb-1">Why I need this?</div>
        <div className="text-normal font-light max-w-md mb-2">
          Are you one of those, who has lot of secrets/passwords to memorize,
          and write them PLAINLY in a paper, email, chats, other media? You
          think password managers are risky?
        </div>
        <div className="text-normal font-light max-w-md mb-2">
          Well, writing them plainly is not secure!
        </div>
        <div className="text-normal font-light max-w-md mb-2">
          Seqret can help you hide your secrets better but made it still easily
          readable (eh?). Yes, so you can manage your secrets in a more secure
          manner.
        </div>
      </div>

      <div className="mb-5">
        <div className="text-lg font-bold mb-1">How does this works?</div>
        <div className="text-normal font-light max-w-md mb-2">
          This app is essentially helping you encrypt your secret strings using
          your chosen algorithm + your passphrase, and then render it as an
          encrypted QR image.
        </div>
        <div className="text-normal font-light max-w-md mb-2">
          And this app will help you read it back from QR image again, of
          course.
        </div>
        <div className="text-normal font-light max-w-md mb-2">
          This app is fully local (your data will not leave your browser).
        </div>
      </div>

      <div className="mb-5">
        <div className="text-lg font-bold mb-1">Is this safe?</div>
        <div className="text-normal font-light max-w-md mb-2">
          <b>Application-wise,</b> this app was made using ReactJS, fully
          client-rendered, and never send any data to any backend whatsoever. So
          you don't need to worry on that part because your data will never
          leave your browser. You can even run this app offline (after your
          browser fully loaded it)
        </div>
        <div className="text-normal font-light max-w-md mb-2">
          <b>Information-wise,</b> this QR store your secrets as encrypted data,
          so it's security will depends on how strong your passphrase are and
          how strong algorithm you chose:{" "}
          <a
            className="underline"
            href="https://edu.gcfglobal.org/en/internetsafety/creating-strong-passwords/1/"
          >
            How to make strong passwords.
          </a>
        </div>
        <div className="text-normal font-medium max-w-md mb-2">
          PS 1: Hints/notes are meant to be publicly readable, so don't write
          your secret in hints/notes.
        </div>
        <div className="text-normal font-medium max-w-md mb-2">
          PS 2: Even if the QR is protected with incredibly strong password,
          please still be mindful about how you store or send around the QR
          containing your secrets.
        </div>
        <div className="text-lg font-light"></div>
      </div>

      <div className="mb-5">
        <div className="text-lg font-bold mb-1">
          I forgot the algorithm I used!
        </div>
        <div className="text-normal font-light max-w-md mb-2">
          I feel sorry for you, but I can't and won't do anything about that.
          Next time, when you create new QR, you might consider adding clues
          about your algorithm in the public notes (but be careful with the
          clue).
        </div>
      </div>

      <div className="mb-5">
        <div className="text-lg font-bold mb-1">Why create this?</div>
        <div className="text-normal font-light max-w-md mb-2">
          I don't really fit with password managers.
        </div>
        <div className="text-normal font-light max-w-md mb-2">
          I need to take notes on crypto wallets passphrases. They advised me to
          write it in a paper and hell it doesn't sound secure at all, and I
          also started to have too many different passwords to memorize. So, I
          tried encrypting them, but manual encrypt-decrypt works is a hassle so
          I made this app.
        </div>
        <div className="text-normal font-light max-w-md mb-2">
          Oh, and I also want to experiments on ReactJS+Github Pages.
        </div>
      </div>

      <div className="mb-5">
        <div className="text-lg font-bold mb-1">Who created this?</div>
        <div className="text-normal font-light max-w-md mb-2">Aliens.</div>
      </div>
    </>
  );
};
