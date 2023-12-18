import { Link } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

function Header() {
  // const { user, logout } = useAuth(); // todo
  const user = {
    displayName: "username",
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const navigate = useNavigate();

  function handleLogoutBtnClick() {
    if (user) {
      // logout(); // todo
    }
    // navigate("/auth/login"); // todo
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full bg-white sticky top-0 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <Link to="/">
              <CodeBracketIcon className="h-6 w-6 cursor-pointer" />
            </Link>
          </span>
          <span className="font-bold">React Fire PhotoFolio</span>
        </div>
        <div className="hidden lg:block">
          {user && <span className="font-bold pr-3">{user.displayName}</span>}
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={handleLogoutBtnClick}
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
        <div className="lg:hidden">
          <Bars3Icon onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                      <CodeBracketIcon className="h-6 w-6 cursor-pointer" />
                    </span>
                    <span className="font-bold">React Fire PhotoFolio</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                {user && <span>{user.displayName}</span>}
                <button
                  type="button"
                  className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  onClick={handleLogoutBtnClick}
                >
                  {user ? "Logout" : "Login"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
