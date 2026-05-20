"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Input } from "@heroui/react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { signIn, signInWithGoogle } from "@/lib/auth-client";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn(formData.email, formData.password);
      if (res.ok) {
        toast.success("Welcome to DriveFleet!");
        router.push("/");
      } else {
        toast.error(res.error || "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const res = await signInWithGoogle();
      if (res.ok) {
        toast.success("Logged in with Google successfully!");
        router.push("/");
      } else {
        toast.error("Google authentication failed.");
      }
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
              Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Back</span>
            </h2>
            <p className="text-base-content/50 font-bold text-sm">Sign in to your premium rental club</p>
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

          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div className="space-y-2">
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

            <div className="space-y-2">
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
                startContent={<Lock className="w-5 h-5 text-base-content/40" />}
                className="bg-transparent text-base-content font-semibold"
              />
            </div>

            <div className="flex justify-end">
              <Link
                href="#"
                className="text-xs font-bold text-purple-600 hover:text-purple-700 hover:underline underline-offset-4 transition-all"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              color="secondary"
              type="submit"
              isLoading={loading}
              className="w-full h-14 text-sm font-extrabold rounded-2xl shadow-xl shadow-purple-600/10 group bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white cursor-pointer hover:scale-[1.01] active:scale-100 transition-all border-0"
            >
              Sign In <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="text-center pt-2">
            <p className="text-sm text-base-content/60 font-semibold">
              New to DriveFleet?{" "}
              <Link
                href="/register"
                className="text-purple-600 font-extrabold hover:text-purple-700 hover:underline underline-offset-4 transition-all"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
