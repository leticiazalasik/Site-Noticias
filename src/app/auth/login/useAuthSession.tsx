import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthProvider";

export const useAuthSession = () => {
  const { data: session } = useSession();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [forceUpdate, setForceUpdate] = useState(0);

  const update = useCallback(() => {
    setForceUpdate(prev => prev + 1);
    sessionStorage.clear(); // Limpa todas as informações do usuário do sessionStorage
    setUser(null);
  }, [setUser]);

  useEffect(() => {
    if (session?.user) {
      setUser({ name: session.user.name });
      sessionStorage.setItem("user", JSON.stringify({ name: session.user.name }));
      router.push("/admin");
    } else {
      const savedUser = sessionStorage.getItem("user");
      if (savedUser) {
        const user = JSON.parse(savedUser);
        setUser(user);
        router.push("/admin");
      }
    }
    setLoading(false);
  }, [session, setUser, router, forceUpdate]);

  return { loading, user: session?.user, update };
};
