"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthSession } from "./useAuthSession";

export default function LoginPage() {
  const { user, loading, update } = useAuthSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (user) {
    router.push("/admin");
    return null;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Credenciais inválidas");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      setError("Erro ao fazer login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={onSubmit} className="space-y-4 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {error && <div className="bg-red-100 text-red-600 p-3 rounded">{error}</div>}

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="mt-1 block w-full rounded border p-2 text-black"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Senha
          </label>
          <input
            type="password"
            name="password"
            required
            className="mt-1 block w-full rounded border p-2 text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}