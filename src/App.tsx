import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";

import { Home } from "./components/ScreenHome";
import { Create } from "./components/ScreenCreate";
import { Scan } from "./components/ScreenScan";
import { Footer } from "./components/BlockFooter";

import config from "./config";

const engine = new Styletron();

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
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <div className="app flex justify-center mx-8 mt-12">
          <div className="site max-w-3xl w-full">
            <BrowserRouter basename={config.SUB_DIR_PATH}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/scan" element={<Scan />} />
              </Routes>
            </BrowserRouter>
            <br />
            <Footer />
          </div>
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
}
