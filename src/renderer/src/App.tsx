import { AppRoutes } from "../routes";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

export function App() {
  return (
    <h1 className="h-screen w-screen bg-rotion-900 text-rotion-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen">
        <Header />

        <AppRoutes />
      </div>
    </h1>
  );
}
