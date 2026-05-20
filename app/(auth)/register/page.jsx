"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Input } from "@heroui/react";
import { User, Mail, Lock, Image as ImageIcon, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { signUp, signIn } from "@/lib/auth-client";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "password") {
      setPasswordError("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const user = Object.fromEntries(form.entries());
    console.log(user);

    const pass = user.password || "";
    if (pass.length < 6) {
      const msg = "Password must be at least 6 characters long";
      setPasswordError(msg);
      toast.error(msg);
      return;
    }
    if (!/[A-Z]/.test(pass)) {
      const msg = "Password must contain at least one uppercase letter";
      setPasswordError(msg);
      toast.error(msg);
      return;
    }
    if (!/[a-z]/.test(pass)) {
      const msg = "Password must contain at least one lowercase letter";
      setPasswordError(msg);
      toast.error(msg);
      return;
    }
    setPasswordError("");

    setLoading(true);

    try {
      const { data, error } = await signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.image || undefined,
        callbackURL: "/login",
      });
      if (!error) {
        toast.success("Account created successfully!");
        router.push("/login");
      } else {
        toast.error(error.message || "Failed to create account");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.error(err);
      toast.error("Could not complete Google login.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-purple-50/20 to-slate-100/60 dark:from-slate-950 dark:via-zinc-900 dark:to-black py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center transition-colors duration-300">
      <div className="w-full max-w-md">
        <div className="bg-base-100 p-8 md:p-10 rounded-[2.5rem] border border-base-200 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/5 rounded-full -ml-16 -mb-16 blur-3xl"></div>

          <div className="text-center space-y-2 relative">
            <h2 className="text-3xl font-black text-base-content tracking-tight">
              Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">DriveFleet</span>
            </h2>
            <p className="text-base-content/50 font-bold text-sm">Create your account to start renting premium cars</p>
          </div>

          <div className="space-y-4">
            <Button
              variant="bordered"
              onClick={handleGoogleLogin}
              isLoading={googleLoading}
              className="w-full h-12 font-bold rounded-2xl border-base-300 hover:bg-base-200/50 hover:border-purple-500/30 transition-all gap-3 bg-base-100 text-base-content cursor-pointer"
            >
              {!googleLoading && <FcGoogle className="w-5 h-5" />}
              Sign in with Google
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-base-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-base-100 px-4 text-base-content/40 font-bold tracking-widest">Or with email</span>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-bold text-base-content/60 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <Input
                id="name"
                required
                placeholder="Enter your name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                startContent={<User className="w-5 h-5 text-base-content/40" />}
                className="bg-transparent text-base-content font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-bold text-base-content/60 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <Input
                id="email"
                required
                placeholder="Enter your email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                startContent={<Mail className="w-5 h-5 text-base-content/40" />}
                className="bg-transparent text-base-content font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="image" className="text-xs font-bold text-base-content/60 uppercase tracking-widest ml-1">
                Profile Image URL
              </label>
              <Input
                id="image"
                placeholder="https://images.unsplash.com/..."
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                startContent={<ImageIcon className="w-5 h-5 text-base-content/40" />}
                className="bg-transparent text-base-content font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-bold text-base-content/60 uppercase tracking-widest ml-1">
                Password
              </label>
              <Input
                id="password"
                required
                placeholder="••••••••"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!passwordError}
                errorMessage={passwordError}
                startContent={<Lock className="w-5 h-5 text-base-content/40" />}
                className="bg-transparent text-base-content font-semibold"
              />
            </div>

            <Button
              color="secondary"
              type="submit"
              isLoading={loading}
              className="w-full h-14 text-sm font-extrabold rounded-2xl shadow-xl shadow-purple-600/10 group bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white cursor-pointer hover:scale-[1.01] active:scale-100 transition-all border-0 mt-2"
            >
              Create Account <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="text-center pt-2">
            <p className="text-sm text-base-content/60 font-semibold">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-purple-600 font-extrabold hover:text-purple-700 hover:underline underline-offset-4 transition-all"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
