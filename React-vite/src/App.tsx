import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import People from "./pages/People";

const queryClient = new QueryClient();
const CharactersLazy = lazy(() => import("./pages/Characters"));
const DetailsLazy = lazy(() => import("./pages/Details"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/people" element={<People />} />
            <Route path="/characters" element={<CharactersLazy />} />
            <Route path="/details/:peopleId" element={<DetailsLazy />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
