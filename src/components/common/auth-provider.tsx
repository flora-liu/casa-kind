"use client";

import { createContext, useContext, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  userId?: string;
}

const AuthContext = createContext<AuthContextProps>({
  userId: undefined,
});

export const useAuthContext = () => useContext(AuthContext);

export interface AuthProviderProps {
  children: React.ReactNode;
  accessToken: string | null;
  userId?: string;
}

const AuthProvider: React.FC<AuthProviderProps> = ({
  accessToken,
  children,
  userId,
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

  return (
    <AuthContext.Provider value={{ userId }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
