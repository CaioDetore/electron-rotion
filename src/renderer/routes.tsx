
import { Route } from "react-router-dom";
import { Router } from "../lib/electron-router-dom";
import { Blank } from "./src/pages/blank";

export function AppRoutes() {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<Blank />} />
        </>
      }
    />
  );
}
