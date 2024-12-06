// components/admin/Sidebar.tsx
"use client" // Indica que o componente é executado no lado do cliente (não no servidor)

import Link from "next/link" // Importa o componente Link do Next.js para navegação entre páginas
import { usePathname } from "next/navigation" // Importa hook para obter o caminho atual da URL
import { signOut } from "next-auth/react" // Importa a função signOut do NextAuth para deslogar o usuário

export default function AdminSidebar() {
  const pathname = usePathname() // Obtém o caminho atual da URL para aplicar estilos ativos na navegação

  // Define os links que serão exibidos na barra lateral
  const links = [
    { href: "/admin", label: "Dashboard" }, // Link para o dashboard
    { href: "/admin/noticias", label: "Notícias" }, // Link para gerenciamento de notícias
    { href: "/admin/categorias", label: "Categorias" }, // Link para gerenciamento de categorias
  ]

  return (
    <aside className="w-64 bg-gray-800 text-white p-6"> {/* Barra lateral com largura fixa, cor de fundo e padding */}
      <nav className="space-y-4"> {/* Navegação com espaçamento entre os itens */}
        {links.map((link) => (
          <Link
            key={link.href} // A chave única para cada link
            href={link.href} // O destino da navegação
            className={`block p-2 rounded ${pathname === link.href ? "bg-gray-700" : ""}`} // Aplica estilo de fundo cinza escuro no link ativo
          >
            {link.label} {/* Rótulo de cada link */}
          </Link>
        ))}

        <button
          onClick={() => signOut()} // Função que desloga o usuário quando o botão é clicado
          className="w-full text-left p-2 text-red-400 hover:bg-gray-700 rounded" // Estilo do botão de logout
        >
          Sair {/* Texto do botão */}
        </button>
      </nav>
    </aside>
  )
}
