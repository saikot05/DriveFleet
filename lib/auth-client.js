"use client";

import { useState, useEffect } from "react";

const SESSION_KEY = "drivefleet-session";
const USER_LIST_KEY = "drivefleet-users";

const listeners = new Set();

const broadcast = () => {
  listeners.forEach((l) => l());
};

export function useSession() {
  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const checkSession = () => {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsPending(false);
    };

    checkSession();
    listeners.add(checkSession);

    return () => {
      listeners.delete(checkSession);
    };
  }, []);

  return {
    data: user ? { user } : null,
    isPending,
  };
}

export async function signIn(email, password) {
  const users = JSON.parse(localStorage.getItem(USER_LIST_KEY) || "[]");
  const match = users.find((u) => u.email === email && u.password === password);

  if (match) {
    const sessionUser = {
      name: match.name,
      email: match.email,
      image: match.image || null,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    broadcast();
    return { ok: true };
  }

  if (email === "user@example.com" && password === "password123") {
    const sessionUser = {
      name: "Demo User",
      email: "user@example.com",
      image: null,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    broadcast();
    return { ok: true };
  }

  return { ok: false, error: "Invalid email or password" };
}

export async function signInWithGoogle() {
  const googleUser = {
    name: "Google Explorer",
    email: "explorer@gmail.com",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400",
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(googleUser));
  broadcast();
  return { ok: true };
}

export async function signUp(name, email, password, image) {
  const users = JSON.parse(localStorage.getItem(USER_LIST_KEY) || "[]");
  if (users.some((u) => u.email === email)) {
    return { ok: false, error: "Email already registered" };
  }
  users.push({ name, email, password, image: image || null });
  localStorage.setItem(USER_LIST_KEY, JSON.stringify(users));
  return { ok: true };
}

export async function signOut() {
  localStorage.removeItem(SESSION_KEY);
  broadcast();
}
