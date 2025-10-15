/** biome-ignore-all lint/nursery/useUniqueElementIds: it's fine */
import Uppy from "@uppy/core";
import {
  Dashboard,
  UppyContextProvider,
} from "@uppy/react";
import GoldenRetriever from "@uppy/golden-retriever";
import Tus from "@uppy/tus";
import { useState } from "react";
import Compressor from "@uppy/compressor";
import "./App.css";
import "@uppy/core/css/style.css";
import "@uppy/dashboard/css/style.css";

function App() {
  const [uppy] = useState(() =>
    new Uppy()
      .use(Tus, {
        endpoint: "https://tusd.tusdemo.net/files/",
      })
      .use(GoldenRetriever, {
        expires: 24 * 60 * 60 * 1000, // 24 hours
        serviceWorker: false,
      })
      .use(Compressor, {
        quality: 0.6,
      })
  );

  return (
    <UppyContextProvider uppy={uppy}>
      <main className="p-5 max-w-xl mx-auto">
        <h1 className="text-4xl font-bold my-4">Welcome to React.</h1>
        <article>
          <h2 className="text-2xl my-4">Dashboard with Dropbox & GoldenRetriever</h2>
          <p className="text-sm text-gray-600 mb-4">
            Upload progress is saved automatically. If you refresh the page or
            the browser crashes, you can resume uploads from where you left off!
          </p>
          <Dashboard
            uppy={uppy}
            hideCancelButton={false}
            height={400}
            note="Browse Dropbox via Companion and pick files. Upload progress will be saved."
          />
        </article>
      </main>
    </UppyContextProvider>
  );
}

export default App;
