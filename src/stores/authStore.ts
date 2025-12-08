// src/stores/authStore.ts
import { create } from "zustand";
import type { User, Session, AuthError } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  initialized: boolean;

  // Email auth
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null }>;
  signUp: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null }>;

  // Phone OTP auth
  sendOtp: (phone: string) => Promise<{ error: AuthError | null }>;
  verifyOtp: (
    phone: string,
    token: string
  ) => Promise<{ error: AuthError | null }>;

  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

// Just to avoid registering multiple listeners
let authStateChangeSubscription:
  | ReturnType<typeof supabase.auth.onAuthStateChange>
  | null = null;

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  initialized: false,

  /* ---------------- EMAIL SIGN-IN ---------------- */
  signIn: async (email: string, password: string) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (data.session) {
        set({
          user: data.user,
          session: data.session,
          loading: false,
        });
      } else {
        set({ loading: false });
      }

      return { error };
    } catch (err) {
      set({ loading: false });
      return { error: err as AuthError };
    }
  },

  /* ---------------- EMAIL SIGN-UP ---------------- */
  signUp: async (email: string, password: string) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (data.session) {
        set({
          user: data.user,
          session: data.session,
          loading: false,
        });
      } else {
        set({ loading: false });
      }

      return { error };
    } catch (err) {
      set({ loading: false });
      return { error: err as AuthError };
    }
  },

  /* ---------------- SEND PHONE OTP ---------------- */
  sendOtp: async (phone: string) => {
    set({ loading: true });
    try {
      const { error } = await supabase.auth.signInWithOtp({ phone });
      set({ loading: false });
      return { error };
    } catch (err) {
      set({ loading: false });
      return { error: err as AuthError };
    }
  },

  /* ---------------- VERIFY PHONE OTP ---------------- */
  verifyOtp: async (phone: string, token: string) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: "sms",
      });

      if (data.session) {
        set({
          user: data.user!,
          session: data.session,
          loading: false,
        });
      } else {
        set({ loading: false });
      }

      return { error };
    } catch (err) {
      set({ loading: false });
      return { error: err as AuthError };
    }
  },

  /* ---------------- SIGN OUT ---------------- */
  signOut: async () => {
    set({ loading: true });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
      }
    } finally {
      set({
        user: null,
        session: null,
        loading: false,
      });
    }
  },

  /* ---------------- INITIALIZE ---------------- */
  initialize: async () => {
    if (get().initialized) return;

    set({ loading: true });

    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
      }

      if (session) {
        set({
          user: session.user,
          session,
          loading: false,
          initialized: true,
        });
      } else {
        set({ loading: false, initialized: true });
      }

      // Listen to auth changes only once
      if (!authStateChangeSubscription) {
        authStateChangeSubscription = supabase.auth.onAuthStateChange(
          (_event, session) => {
            set({
              user: session?.user ?? null,
              session,
              loading: false,
            });
          }
        );
      }
    } catch (err) {
      console.error("Auth init error:", err);
      set({ loading: false, initialized: true });
    }
  },
}));
