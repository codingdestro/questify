import React from "react";
import ProtectedNavbar from "@/components/protected-navbar";
import Footer from "@/components/footer";

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      <ProtectedNavbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
export default ProtectedLayout;
