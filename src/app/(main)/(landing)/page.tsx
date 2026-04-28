import { appConfig } from "@/app-config";
import Home from "./home";

export default async function HomePage() {
  if (appConfig.mode === "maintenance") {
    return (
      <div className="flex items-center justify-center bg-slate-800 min-h-screen text-white text-5xl">
        <h1>Website Under Maintenance</h1>
      </div>
    );
  }

  if (appConfig.mode === "live") {

    return (
      <div>
        <Home />

      </div>
    );
  }
}
