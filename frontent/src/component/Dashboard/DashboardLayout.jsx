import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX, HiChevronDown, HiChevronUp } from "react-icons/hi";
import { Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePath, setActivePath] = useState("/dashboard"); // initial active path
  const [blogOpen, setBlogOpen] = useState(false); // submenu toggle
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setActivePath(location.pathname); // update active path on route change

    // Automatically open Blog submenu if route matches
    if (location.pathname.startsWith("/dashboard/blog")) {
      setBlogOpen(true);
    } else {
      setBlogOpen(false);
    }
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Register", path: "/dashboard/signup" },
    {
      name: "Blog",
      path: "/dashboard/blog",
      subMenu: [{ name: "Create Blog", path: "/dashboard/blog/create" }],
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/" className="font-bold text-lg">
            Home
          </Link>
          <button
            className="md:hidden text-2xl"
            onClick={() => setSidebarOpen(false)}
          >
            <HiX />
          </button>
        </div>

        <ul className="flex flex-col p-4 gap-2">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              {/* Parent menu item */}
              <div
                className={`flex justify-between items-center px-4 py-2 rounded  transition-colors duration-200 cursor-pointer ${
                  activePath === item.path
                    ? "bg-gray-200/50 font-semibold"
                    : "font-normal hover:bg-gray-200/50"
                }`}
                onClick={() => {
                  if (item.subMenu) {
                    setBlogOpen(!blogOpen); // toggle submenu
                    navigate(item.path);
                    setSidebarOpen(false);
                  } else {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }
                }}
              >
                <span>{item.name}</span>
                {item.subMenu &&
                  (blogOpen ? (
                    <HiChevronUp className="ml-2" />
                  ) : (
                    <HiChevronDown className="ml-2" />
                  ))}
              </div>

              {/* SubMenu */}
              {item.subMenu && blogOpen && (
                <ul className="ml-4 mt-1 flex flex-col gap-1">
                  {item.subMenu.map((subItem, subIdx) => (
                    <li key={subIdx}>
                      <Link
                        to={subItem.path}
                        className={`block px-4 py-2 rounded hover:bg-gray-200 transition-colors duration-200 ${
                          activePath === subItem.path
                            ? "bg-gray-200 font-semibold"
                            : "font-normal"
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="pl-7 self-end mt-auto">
          <Button variant="outlined" onClick={handleLogout} color="error">
            Logout
          </Button>
        </div>
      </div>

      {/* Hamburger button for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 bg-white p-2 rounded shadow"
        onClick={() => setSidebarOpen(true)}
      >
        <HiMenu className="text-2xl" />
      </button>

      {/* Content */}
      <div className="flex-1 ml-0 md:ml-64 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
