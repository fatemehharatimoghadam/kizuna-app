import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollToHash from "./ScrollToHash";

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ScrollToHash />

      <Navbar />

      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}