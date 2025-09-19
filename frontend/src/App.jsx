import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPage } from "./pages/landingPage";
import { AuthPage } from "./pages/loginPage";
import { DashboardPage } from "./pages/dashboardPage";
import { VerifierPage } from "./pages/verifiyerPage";

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/auth',
      element: <AuthPage />
    },
    {
      path: '/dashboard',
      element: <DashboardPage />
    },
    {
      path: '/verifierPage',
      element: <VerifierPage />
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}
