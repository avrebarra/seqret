import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export function App() {
  // context, vars, and states
  const [readiness, setReadiness] = React.useState<boolean>(false);

  // helper funcs
  const funcLoadData = async () => {};

  // effects
  React.useEffect(() => {
    funcLoadData();
  }, [readiness]);

  return (
    <div className="app flex justify-center mx-8 mt-12">
      <div className="site max-w-3xl w-full">
        <BrowserRouter>
          {!readiness ? (
            <div>not ready</div>
          ) : (
            <Routes>
              <Route path="/" element={<span />} />
              <Route path="/create" element={<span />} />
              <Route path="/access" element={<span />} />
            </Routes>
          )}
        </BrowserRouter>
      </div>
    </div>
  );
}
