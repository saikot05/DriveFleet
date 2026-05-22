# 🚗 DriveFleet — Premium Car Rental Platform

DriveFleet is an enterprise-grade, full-stack car rental application designed for seamless luxury and utility vehicle reservations. Built using the **Next.js (App Router)** ecosystem, **Tailwind CSS**, and **DaisyUI**,**HeroUI** it delivers an intuitive, high-fidelity glassmorphic UI/UX specifically tailored for professional evaluators and technical recruiters.

The platform relies completely on custom interactive UI overlays and elegant snackbar feedback systems instead of native browser popups, maintaining strict data security guidelines and state persistence across hard route reloads.

## 🌐 Live Production Deployment
- **Live Application URL:** [https://drivefleet-client-iota.vercel.app/]
- **Client-Side Repository:** [https://github.com/saikot05/DriveFleet]
- **Server-Side Repository:** [https://github.com/saikot05/drivefleet-server]

---

## ✨ Key Platform Features

* **Multi-Criteria Filter Dashboard & Live Search:** Features an optimized live search pipeline running substring matches via a backend MongoDB regex engine across model keywords, automakers, and coordinates. Incorporates granular categorical selectors (SUVs, Sedans, Luxury) alongside dynamic sorting handles (Pricing scales, Year of manufacture, and Reservation Popularity).
* **Complete CRUD Engine with Overlay Modals:** Built with robust structural validation for vehicle asset insertion. Fleet owners maintain full authorization to update active parameters dynamically (Price, Status, Description, Image, Location) or safely execute inventory purging backed by custom modal validation confirmations.
* **Atomic Double-Action Booking Routine:** Reserving a vehicle automatically updates structural data models over a unified database transaction—instantly altering the vehicle's availability flag to `false` while atomically stepping up its global lifetime `booking_count` using the MongoDB `$inc` operator.
* **State-Persistent Authorization Guard:** Protected application routes (`/add-car`, `/my-bookings`, `/my-added-cars`) validate active sessions through remote JSON Web Key Sets (JWKS). Client-side state trees survive intentional browser reloads natively, preventing sudden, unhandled redirections to the sign-in prompt.
* **Polished Recruiter-Friendly UI & Polish:** Engineered with a strict focus on presentation continuity. Incorporates balanced typography scales, standardized multi-column card matching aspect-ratios, custom full-page skeletal loading animations, a friendly custom `404 Not Found` navigation terminal, and updated corporate branding assets (featuring the modern X network vector logo).

---

## 🛠️ Complete Technical Stack

- **Frontend Core:** Next.js 14+ (App Router utilizing optimized Server/Client boundary trees)
- **Styling UI:** Tailwind CSS, DaisyUI component library (Custom Dark Glassmorphic configuration)
- **Feedback & Alerts:** React Hot Toast / SweetAlert2 (Zero default browser alert patterns used)
- **State Synchronization:** Native React Hooks, `useSearchParams`, `useRouter`, and Next.js navigation hooks
- **Iconography:** Lucide React (Featuring updated global network logo layouts)

---

## 🚀 Local Installation & Environment Setup

To boot this front-end cluster environment on your local machine, execute the following steps:

