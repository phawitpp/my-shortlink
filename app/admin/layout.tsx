import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <header>{/* Header content */}</header>
      <main className="flex min-h-screen flex-col items-center">
        {children}
      </main>
      <footer>{/* Footer content */}</footer>
    </div>
  );
};

export default Layout;
