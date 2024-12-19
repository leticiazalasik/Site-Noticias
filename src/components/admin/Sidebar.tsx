"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useAuth } from "@/contexts/AuthProvider"; // Importa o contexto de autenticação

export default function AdminSidebar() {
  const { setUser } = useAuth(); // Obtém a função setUser do contexto de autenticação
  const pathname = usePathname(); // Obtém o caminho atual da URL para aplicar estilos ativos na navegação

  const handleLogout = async () => {
    await signOut({ redirect: false });
    sessionStorage.clear(); // Limpa todas as informações do usuário do sessionStorage
    setUser(null); // Reseta o estado do usuário no contexto
    window.location.href = "/"; // Redireciona para a página inicial
  };

  // Define os links que serão exibidos na barra lateral
  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/noticias", label: "Notícias" },
    { href: "/admin/categorias", label: "Categorias" },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <nav className="space-y-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block p-2 rounded ${pathname === link.href ? "bg-gray-700" : ""}`}
          >
            {link.label}
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="w-full text-left p-2 text-red-400 hover:bg-gray-700 rounded"
        >
          Sair
        </button>
      </nav>
    </aside>
  );
}
