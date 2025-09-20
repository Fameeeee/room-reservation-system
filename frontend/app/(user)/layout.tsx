import Navbar from "@/components/common/Navbar";
import React from "react";
import "../../app/globals.css";
import { Toaster } from "sonner";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="mt-5">{children}</main>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
