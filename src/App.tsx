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
        <div className="appwrapper flex justify-center items-center h-screen w-screen ">
          <div className="app w-full max-w-lg h-full xs:max-h-144">
            <div className="content p-10 py-16">
              <BrowserRouter basename={process.env.APP_BASE_PATH}>
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
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
}
