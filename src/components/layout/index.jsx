import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 flex flex-col  transition-colors">
      <Header />
      <main className="flex-1 container py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
