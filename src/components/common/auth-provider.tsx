"use client";

import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

interface AuthProviderProps {
  children: React.ReactNode;
  accessToken: string | null;
}

const AuthProvider: React.FC<AuthProviderProps> = ({
  accessToken,
  children,
}) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      /** Handle when session changes or becomes invalid */
      if (session?.access_token !== accessToken) {
        /** Trigger a router refresh whenever the current session changes */
        router.refresh();
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, [accessToken, supabase, router]);

  return children;
};

export default AuthProvider;
