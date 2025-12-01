import { create } from "zustand";
import { User, Session, AuthError } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  initialized: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null }>;
  signUp: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

// Store the auth state change subscription to allow cleanup
let authStateChangeSubscription: ReturnType<
  typeof supabase.auth.onAuthStateChange
> | null = null;

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  initialized: false,

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
    } catch (error) {
      set({ loading: false });
      return { error: error as AuthError };
    }
  },

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
    } catch (error) {
      set({ loading: false });
      return { error: error as AuthError };
    }
  },

  signOut: async () => {
    set({ loading: true });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
      }
      set({
        user: null,
        session: null,
        loading: false,
      });
    } catch (error) {
      console.error("Error signing out:", error);
      set({
        user: null,
        session: null,
        loading: false,
      });
    }
  },

  initialize: async () => {
    // Prevent multiple initializations
    if (get().initialized) {
      return;
    }

    set({ loading: true });

    try {
      // Get initial session
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
        set({
          loading: false,
          initialized: true,
        });
        return;
      }

      if (session) {
        set({
          user: session.user,
          session,
          loading: false,
          initialized: true,
        });
      } else {
        set({
          loading: false,
          initialized: true,
        });
      }

      // Set up auth state change listener only once
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
    } catch (error) {
      console.error("Error initializing auth:", error);
      set({
        loading: false,
        initialized: true,
      });
    }
  },
}));
