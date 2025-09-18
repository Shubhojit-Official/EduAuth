import Sidebar from "./components/Sidebar"
import { LandingPage } from "./pages/landingPage";
import { AuthPage } from "./pages/loginPage";
import { DashboardPage } from "./pages/dashboardPage";
import { VerifierPage } from "./pages/verifiyerPage";

export default function App() {
  return (
    <>
      <div>
        {/*
        <Sidebar />
        <LandingPage />
        <AuthPage />
        <DashboardPage />
        */}
        <VerifierPage />
      </div>
    </>
  );
}
