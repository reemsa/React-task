import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const CharactersLazy = React.lazy(() => import("./pages/Characters"));
const DetailsLazy = React.lazy(() => import("./pages/Details"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<CharactersLazy />} />
          <Route path="/details/:peopleId" element={<DetailsLazy />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
