"use client";

// Mock auth client setup for now
export function useSession() {
  return {
    data: {
      user: null // Replace with actual user object if testing login state, e.g. { name: "Rakib", email: "rakib@example.com" }
    },
    isPending: false
  };
}

export async function signOut() {
  console.log("signOut called");
}
