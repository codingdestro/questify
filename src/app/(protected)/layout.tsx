import React from "react";
import ProtectedNavbar from "@/components/protected-navbar";

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      <ProtectedNavbar />
      <main>{children}</main>
    </div>
  );
};
export default ProtectedLayout;
