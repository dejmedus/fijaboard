import { Link } from "react-router";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // hyperui is a component boilerplate lib
    // https://www.hyperui.dev/components/marketing/headers
    <header>
      <div className="mx-auto px-6 md:px-8 max-w-screen-2xl">
        <div className="flex items-center h-24">
          <NavLogo />
          <NavLinks />
          {!isLoading && (
            <div className="md:flex gap-12">
              {user ? (
                <UserMenu
                  user={user}
                  logout={logout}
                  isOpen={isMenuOpen}
                  setIsOpen={setIsMenuOpen}
                />
              ) : (
                <AuthButtons />
              )}
              <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function NavLogo() {
  return (
    <div className="flex-1 md:flex-none">
      <Link
        to="/"
        className="font-semibold text-neutral-800 hover:text-neutral-800/75 text-xl transition"
      >
        FijaBoard
      </Link>
    </div>
  );
}

function NavLinks() {
  return (
    <nav aria-label="Global" className="hidden md:flex flex-1 md:ml-8">
      <ul className="flex gap-6 text-sm">
        <li>
          <a
            className="text-neutral-500 hover:text-neutral-500/75 transition"
            href="/catalog"
          >
            Catalog
          </a>
        </li>
      </ul>
    </nav>
  );
}

function UserMenu({
  user,
  logout,
  isOpen,
  setIsOpen,
}: {
  user: any;
  logout: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <div className="hidden md:block md:relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="shadow-inner border border-neutral-300 rounded-full overflow-hidden"
      >
        <span className="sr-only">Toggle dashboard menu</span>
        <img
          // FE images come from the public folder
          // could store images somehow BE and then store url in db
          src={user?.profile_picture || "/default-avatar.png"}
          alt="User profile"
          className="size-10 object-cover"
        />
      </button>

      {isOpen && (
        <div
          className="z-10 absolute bg-white shadow-lg mt-0.5 border border-neutral-100 rounded-md divide-y divide-neutral-100 w-56 end-0"
          role="menu"
        >
          <div className="p-2">
            <Link
              to="/profile"
              className="block hover:bg-neutral-50 px-4 py-2 rounded-lg text-neutral-500 hover:text-neutral-700 text-sm"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
          </div>

          <div className="p-2">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="flex items-center gap-2 hover:bg-red-50 px-4 py-2 rounded-lg w-full text-red-700 text-sm"
              role="menuitem"
            >
              <LogoutIcon />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AuthButtons() {
  return (
    <div className="hidden md:flex md:gap-2">
      <Link
        to="/login"
        className="bg-neutral-100 hover:bg-neutral-200 px-5 py-2 rounded-md font-medium text-neutral-600 text-sm transition"
      >
        Login
      </Link>
      <Link
        to="/signup"
        className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md font-medium text-white text-sm transition"
      >
        Sign up
      </Link>
    </div>
  );
}

function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="md:hidden block">
      <button
        onClick={onClick}
        className="bg-neutral-100 p-2 rounded-sm text-neutral-600 hover:text-neutral-600/75 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
}

function LogoutIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
      />
    </svg>
  );
}
