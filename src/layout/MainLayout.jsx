import { useState, useEffect, useRef } from "react";
import Sidebar from "../shared/Sidebar/Sidebar";
import MainHeader from "../shared/MainHeader/MainHeader";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [pageTransition, setPageTransition] = useState("enter");
  const location = useLocation();
  const mainRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setPageTransition("exit");
    const timer = setTimeout(() => {
      setPageTransition("enter");
      if (mainRef.current)
        mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }, 150);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="flex h-screen relative overflow-hidden">
      <div
        onClick={toggleSidebar}
        className={`
          fixed inset-0 z-40 lg:hidden
          ${
            isSidebarOpen
              ? "bg-black/30 backdrop-blur-sm opacity-50 pointer-events-auto"
              : "bg-transparent backdrop-blur-0 opacity-0 pointer-events-none"
          }
        `}
      />

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col flex-1 w-full h-screen overflow-hidden">
        <MainHeader toggleSidebar={toggleSidebar} />
        <main
          ref={mainRef}
          className={`
            p-5 flex-1 overflow-auto
            ${pageTransition === "enter" ? "opacity-100" : "opacity-0"}
          `}
        >
          <div className="max-w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
