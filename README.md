<div align="center">

# 🚗 DriveFleet — Premium Car Rental Platform

### Enterprise-grade full-stack vehicle reservation system with glassmorphic UI

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-DriveFleet-00C896?style=for-the-badge)](https://drivefleet-client-iota.vercel.app/)
[![Frontend](https://img.shields.io/badge/GitHub-Frontend_Client-181717?style=for-the-badge&logo=github)](https://github.com/saikot05/DriveFleet)
[![Backend](https://img.shields.io/badge/GitHub-Backend_Server-181717?style=for-the-badge&logo=github)](https://github.com/saikot05/drivefleet-server)

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)

</div>

---

## 📖 About

DriveFleet is an enterprise-grade, full-stack car rental application designed for seamless luxury and utility vehicle reservations. Built using the **Next.js (App Router)** ecosystem, **Tailwind CSS**, **DaisyUI** and **HeroUI** — it delivers an intuitive, high-fidelity glassmorphic UI/UX specifically tailored for professional evaluators and technical recruiters.

The platform relies completely on custom interactive UI overlays and elegant snackbar feedback systems instead of native browser popups, maintaining strict data security guidelines and state persistence across hard route reloads.

---

## 🌐 Live Links

| Resource | URL |
|----------|-----|
| 🚀 **Live Application** | [https://drivefleet-client-iota.vercel.app/](https://drivefleet-client-iota.vercel.app/) |
| 💻 **Frontend Repository** | [github.com/saikot05/DriveFleet](https://github.com/saikot05/DriveFleet) |
| 🖥️ **Backend Repository** | [github.com/saikot05/drivefleet-server](https://github.com/saikot05/drivefleet-server) |

---



## ✨ Key Platform Features

### 🔍 Multi-Criteria Filter Dashboard & Live Search
Features an optimized live search pipeline running substring matches via a backend MongoDB regex engine across model keywords, automakers, and coordinates. Incorporates granular categorical selectors (SUVs, Sedans, Luxury) alongside dynamic sorting handles (Pricing scales, Year of manufacture, and Reservation Popularity).

### 🛠️ Complete CRUD Engine with Overlay Modals
Built with robust structural validation for vehicle asset insertion. Fleet owners maintain full authorization to update active parameters dynamically (Price, Status, Description, Image, Location) or safely execute inventory purging backed by custom modal validation confirmations.

### ⚡ Atomic Double-Action Booking Routine
Reserving a vehicle automatically updates structural data models over a unified database transaction — instantly altering the vehicle's availability flag to `false` while atomically stepping up its global lifetime `booking_count` using the MongoDB `$inc` operator.

### 🔐 State-Persistent Authorization Guard
Protected application routes (`/add-car`, `/my-bookings`, `/my-added-cars`) validate active sessions through remote JSON Web Key Sets (JWKS). Client-side state trees survive intentional browser reloads natively, preventing sudden, unhandled redirections to the sign-in prompt.

### 🎨 Polished Recruiter-Friendly UI
Engineered with a strict focus on presentation continuity. Incorporates balanced typography scales, standardized multi-column card matching aspect-ratios, custom full-page skeletal loading animations, a friendly custom `404 Not Found` navigation terminal, and updated corporate branding assets.

---

## 🛠️ Complete Technical Stack

### Frontend
| Layer | Technology |
|-------|------------|
| **Core Framework** | Next.js 14+ (App Router — Server/Client boundary optimized) |
| **Styling** | Tailwind CSS, DaisyUI, HeroUI (Custom Dark Glassmorphic config) |
| **Auth** | Better Auth, JWT, Google OAuth 2.0, JWKS |
| **Feedback & Alerts** | React Hot Toast, SweetAlert2 (zero native browser alerts) |
| **State Management** | React Hooks, `useSearchParams`, `useRouter` |
| **Icons** | Lucide React |

### Backend
| Layer | Technology |
|-------|------------|
| **Runtime** | Node.js + Express.js |
| **Database** | MongoDB (regex-powered search engine) |
| **Authentication** | Better Auth + JWT + Google OAuth 2.0 |
| **Security** | JWKS remote key validation, role-based access control |

---

## 🚀 Local Installation & Environment Setup

### Prerequisites
- Node.js `v18+`
- MongoDB Atlas URI or local MongoDB
- Google OAuth 2.0 credentials

---

### 1️⃣ Frontend Setup

```bash
# Clone the frontend repository
git clone https://github.com/saikot05/DriveFleet.git
cd DriveFleet

# Install all dependencies
npm install

# Start the development server
npm run dev
```

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
BETTER_AUTH_SECRET=your_auth_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

### 2️⃣ Backend Setup

```bash
# Clone the backend repository
git clone https://github.com/saikot05/drivefleet-server.git
cd drivefleet-server

# Install all dependencies
npm install

# Start the backend server
npm run dev
```

Create a `.env` file in the root:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:3000
PORT=5000
```

---

### 3️⃣ Open in Browser

```
Frontend → http://localhost:3000
Backend  → http://localhost:5000
```

---

## 📁 Project Structure

```
DriveFleet/
├── app/
│   ├── (auth)/              # Login & Register pages
│   ├── (dashboard)/         # Protected admin routes
│   │   ├── add-car/
│   │   ├── my-bookings/
│   │   └── my-added-cars/
│   ├── explore/             # Vehicle listing & search
│   ├── cars/[id]/           # Car detail page
│   └── page.js              # Home page
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── modals/              # Custom overlay modals
│   └── skeletons/           # Loading skeleton screens
├── lib/                     # Utilities & API helpers
└── public/                  # Static assets & icons
```

---

## ✅ Feature Checklist

```
✅ Google OAuth 2.0 + Email/Password Authentication
✅ JWT session management with JWKS remote validation
✅ MongoDB regex-powered live search engine
✅ Atomic booking with $inc operator (no race conditions)
✅ Role-based protected route system
✅ Custom glassmorphic modal system (zero browser alerts)
✅ Auth state persistence across hard reloads
✅ Full skeletal loading animations
✅ Admin: Add / Edit / Delete vehicles
✅ User: Browse / Book / Track reservations
✅ Custom 404 Not Found page
✅ Fully responsive — mobile & desktop optimized
```

---

## 👤 Author

**Saikot** — Full Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-saikot05-181717?style=flat-square&logo=github)](https://github.com/saikot05)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/yourprofile)

---

<div align="center">

⭐ **Star this repo if you found it useful!** ⭐

*Built with ❤️ for modern web experiences*

</div>
