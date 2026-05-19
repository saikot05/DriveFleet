import Link from "next/link";

import { LuPhone, LuMail, LuMapPin, LuCar } from "react-icons/lu";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

const usefulLinks = [
  { label: "Home",          href: "/" },
  { label: "Explore Cars",  href: "/explore-cars" },
  { label: "Add Car",       href: "/add-car" },
  { label: "My Bookings",   href: "/my-bookings" },
  { label: "My Added Cars", href: "/my-added-cars" },
];

const supportLinks = [
  { label: "How It Works",    href: "/how-it-works" },
  { label: "FAQs",            href: "/faqs" },
  { label: "Terms of Service",href: "/terms" },
  { label: "Privacy Policy",  href: "/privacy" },
  { label: "Contact Us",      href: "/contact" },
];

const socials = [
  { id: "social-facebook",  href: "https://facebook.com",  Icon: FaFacebookF,  label: "Facebook" },
  { id: "social-instagram", href: "https://instagram.com", Icon: FaInstagram,  label: "Instagram" },
  { id: "social-twitter",   href: "https://twitter.com",   Icon: FaXTwitter,   label: "X / Twitter" },
  { id: "social-youtube",   href: "https://youtube.com",   Icon: FaYoutube,    label: "YouTube" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-6">

        {/* ── Top Grid ──────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div>
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 no-underline">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-400 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 shrink-0">
                <LuCar size={20} />
              </div>
              <div>
                <p className="font-extrabold text-xl text-white leading-tight tracking-tight m-0 bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
                  DriveFleet
                </p>
                <p className="text-[0.52rem] font-bold tracking-[0.2em] uppercase text-violet-400/70 m-0">
                  Rental Club
                </p>
              </div>
            </Link>

            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              Your trusted car rental platform. Premium vehicles, flexible plans, and seamless booking — wherever you need to go.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {socials.map(({ id, href, Icon, label }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  title={label}
                  className="w-9 h-9 rounded-full border border-violet-800/40 bg-violet-950/50 flex items-center justify-center text-violet-400 hover:bg-gradient-to-br hover:from-violet-600 hover:to-purple-400 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/30 hover:border-transparent transition-all duration-200 no-underline"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <p className="text-xs font-bold tracking-[0.16em] uppercase text-gray-500 mb-4 m-0">
              Useful Links
            </p>
            <nav className="flex flex-col gap-0.5">
              {usefulLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-violet-400 hover:pl-1 transition-all duration-200 py-1 no-underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Support */}
          <div>
            <p className="text-xs font-bold tracking-[0.16em] uppercase text-gray-500 mb-4 m-0">
              Support
            </p>
            <nav className="flex flex-col gap-0.5">
              {supportLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-violet-400 hover:pl-1 transition-all duration-200 py-1 no-underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold tracking-[0.16em] uppercase text-gray-500 mb-4 m-0">
              Contact
            </p>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              <li>
                <a
                  href="tel:+8801800000000"
                  className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-violet-400 transition-colors duration-200 no-underline"
                >
                  <LuPhone size={14} className="shrink-0 text-violet-500" />
                  +880 1800-000-000
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@drivefleet.com"
                  className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-violet-400 transition-colors duration-200 no-underline"
                >
                  <LuMail size={14} className="shrink-0 text-violet-500" />
                  support@drivefleet.com
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2.5 text-sm text-gray-500">
                  <LuMapPin size={14} className="shrink-0 mt-0.5 text-violet-500" />
                  123 Fleet Avenue, Dhaka, Bangladesh
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Divider ───────────────────────────────── */}
        <hr className="border-t border-white/[0.06] my-8" />

        {/* ── Bottom bar ────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-gray-600 m-0">
            © {new Date().getFullYear()} DriveFleet. All rights reserved.
          </p>
          <div className="flex gap-5">
            {[
              { label: "Terms",   href: "/terms" },
              { label: "Privacy", href: "/privacy" },
              { label: "Cookies", href: "/cookies" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs text-gray-600 hover:text-violet-400 transition-colors duration-200 no-underline"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
