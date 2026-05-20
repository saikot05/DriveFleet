"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { LuCar } from "react-icons/lu";
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import { HiMenu as MenuIcon, HiX as CloseIcon } from "react-icons/hi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiLogOut, FiPlusCircle, FiCalendar, FiList, FiUser } from "react-icons/fi";

const links = [
  { label: "Home", href: "/" },
  { label: "Explore Cars", href: "/cars" },
  { label: "Add Car", href: "/add-car" },
  { label: "My Added Cars", href: "/my-added-cars" },
  { label: "My Bookings", href: "/my-bookings" },
];

const dropdownItems = [
  { label: "Add Car", href: "/add-car", icon: <FiPlusCircle size={14} /> },
  { label: "My Bookings", href: "/my-bookings", icon: <FiCalendar size={14} /> },
  { label: "My Added Cars", href: "/my-added-cars", icon: <FiList size={14} /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user ?? null;

  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("df-theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("df-theme", next);
  };

  const handleLogout = async () => {
    await signOut();
  };

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navLinks = user
    ? links
    : links.filter((link) => link.href === "/" || link.href === "/cars");

  return (
    <>
      <nav className={cn(
        "sticky top-0 z-50 w-full border-b border-base-200 bg-base-100/80 backdrop-blur-md transition-shadow duration-300",
        scrolled && "shadow-sm"
      )}>
        <header className="max-w-7xl mx-auto px-4 sm:px-6 flex h-16 items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 shrink-0 no-underline">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-400 flex items-center justify-center text-white shadow-lg shadow-purple-500/40 shrink-0">
              <LuCar size={20} />
            </div>
            <div>
              <p className="font-extrabold text-[1.05rem] leading-tight tracking-tight text-base-content m-0">
                DriveFleet
              </p>
              <p className="text-[0.52rem] font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-violet-600 to-purple-400 bg-clip-text text-transparent m-0">
                Rental Club
              </p>
            </div>
          </Link>

          <ul className="hidden lg:flex items-center gap-0.5 flex-1 justify-center list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium no-underline transition-all duration-200",
                    isActive(link.href)
                      ? "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 font-semibold"
                      : "text-base-content/60 hover:text-base-content hover:bg-base-200"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 ml-auto">
            {mounted && (
              <button
                onClick={toggleTheme}
                title={theme === "light" ? "Dark mode" : "Light mode"}
                className="w-9 h-9 rounded-full border border-base-300 flex items-center justify-center text-base-content/50 hover:text-violet-600 hover:bg-violet-50 hover:border-violet-300 dark:hover:bg-violet-900/30 transition-all duration-200 cursor-pointer bg-transparent"
              >
                {theme === "light" ? <RiMoonLine size={17} /> : <RiSunLine size={17} />}
              </button>
            )}

            {!isPending && (
              user ? (
                <div className="relative group hidden lg:block">
                  <button className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border border-base-300 hover:border-violet-400 transition-all duration-200 cursor-pointer bg-transparent">
                    <Image
                      src={user.image || "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400"}
                      alt={user.name || "User"}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-violet-500/20"
                    />
                    <span className="text-sm font-medium text-base-content max-w-[90px] truncate">
                      {user.name}
                    </span>
                    <MdKeyboardArrowDown
                      size={16}
                      className="text-base-content/50 group-hover:rotate-180 transition-transform duration-200"
                    />
                  </button>

                  <div className="absolute right-0 top-[calc(100%+8px)] w-52 bg-base-100 border border-base-200 rounded-2xl shadow-2xl invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-150 flex flex-col py-2 z-50">
                    <div className="px-4 py-3 border-b border-base-200">
                      <p className="font-bold text-sm text-base-content truncate m-0">{user.name}</p>
                      <p className="text-xs text-base-content/50 truncate m-0">{user.email}</p>
                    </div>
                    {dropdownItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-base-content hover:bg-base-200 transition-colors no-underline"
                      >
                        <span className="text-violet-500">{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                    <div className="border-t border-base-200 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors w-full text-left bg-transparent border-0 cursor-pointer"
                      >
                        <FiLogOut size={14} /> Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden lg:inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-400 text-white text-sm font-bold no-underline hover:opacity-90 hover:-translate-y-px active:translate-y-0 transition-all duration-200 shadow-md shadow-purple-500/30"
                >
                  <FiUser size={14} /> Login
                </Link>
              )
            )}

            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="lg:hidden w-9 h-9 rounded-full border border-base-300 flex items-center justify-center text-base-content/60 hover:bg-base-200 transition-all cursor-pointer bg-transparent"
            >
              <MenuIcon size={20} />
            </button>
          </div>
        </header>
      </nav>

      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      <div className={cn(
        "fixed top-0 right-0 h-full w-72 bg-base-100 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out lg:hidden",
        drawerOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-base-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-400 flex items-center justify-center text-white">
              <LuCar size={15} />
            </div>
            <span className="font-extrabold text-base-content text-sm">DriveFleet</span>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-base-content/40 hover:text-base-content hover:bg-base-200 transition-colors bg-transparent border-0 cursor-pointer"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <ul className="flex flex-col gap-0.5 p-4 flex-1 overflow-y-auto list-none m-0">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className={cn(
                  "flex items-center px-4 py-2.5 rounded-xl text-sm font-medium no-underline transition-all",
                  isActive(link.href)
                    ? "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 font-semibold"
                    : "text-base-content/60 hover:bg-base-200 hover:text-base-content"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {user && (
            <>
              <li>
                <p className="px-4 pt-5 pb-1 text-[10px] font-bold text-base-content/30 uppercase tracking-widest m-0">
                  Account
                </p>
              </li>
              {dropdownItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium no-underline transition-all",
                      isActive(item.href)
                        ? "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300"
                        : "text-base-content/60 hover:bg-base-200 hover:text-base-content"
                    )}
                  >
                    <span className="text-violet-500">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </>
          )}
        </ul>

        <div className="p-4 border-t border-base-200">
          {!isPending && (
            user ? (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-violet-50 dark:bg-violet-900/20">
                <Image
                  src={user.image || "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400"}
                  alt={user.name || "User"}
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-violet-500/30 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-base-content truncate m-0">{user.name}</p>
                  <p className="text-[10px] text-base-content/50 truncate m-0">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-400 bg-transparent border-0 cursor-pointer p-1 transition-colors"
                >
                  <FiLogOut size={15} />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-400 text-white text-sm font-bold no-underline shadow-md shadow-purple-500/30 hover:opacity-90 transition-opacity"
              >
                <FiUser size={14} /> Login / Register
              </Link>
            )
          )}
        </div>
      </div>
    </>
  );
}