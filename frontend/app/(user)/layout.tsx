import Navbar from "@/components/common/Navbar";
import React from "react";
import "../../app/globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="mt-5">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
