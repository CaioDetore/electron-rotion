
import { Route } from "react-router-dom";
import { Router } from "../lib/electron-router-dom";
import { Blank } from "./src/pages/blank";
import { Default } from "./src/pages/layouts/default";
import { Document } from "./src/pages/document";

export function AppRoutes() {
  return (
    <Router
      main={
        <Route path="/" element={<Default />}>
          <Route path="/" element={<Blank />} />
          <Route path="/documents/:id" element={<Document />} />
        </Route>
      }
    />
  );
}
