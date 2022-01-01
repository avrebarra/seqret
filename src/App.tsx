import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazily } from "react-lazily";

import { ToasterContainer } from "baseui/toast";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";

import { Footer } from "./components/BlockFooter";
const { Home } = lazily(() => import("./components/ScreenHome"));
const { Create } = lazily(() => import("./components/ScreenCreate"));
const { Scan } = lazily(() => import("./components/ScreenScan"));
const { FAQ } = lazily(() => import("./components/ScreenFAQ"));

import config from "./config";

const engine = new Styletron();

export function App() {
  // context, vars, and states
  const [readiness, setReadiness] = React.useState<boolean>(false);

  // helper funcs
  const funcLoadData = async () => {};
  const funcRenderLoader = () => <p>Loading...</p>;

  // effects
  React.useEffect(() => {
    funcLoadData();
  }, [readiness]);

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <ToasterContainer />
        <div className="app flex justify-center mx-8 mt-12">
          <div className="site max-w-3xl w-full">
            <BrowserRouter basename={config.SUB_DIR_PATH}>
              <React.Suspense fallback={funcRenderLoader()}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/create" element={<Create />} />
                  <Route path="/scan" element={<Scan />} />
                  <Route path="/faqs" element={<FAQ />} />
                </Routes>
              </React.Suspense>
            </BrowserRouter>
            <br />
            <Footer />
          </div>
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
}
