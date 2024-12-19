"use client"; // Marque este arquivo como um componente de cliente

import { useAuth } from '@/contexts/AuthProvider'; // Importando o hook useAuth
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function Header() {
  const { user, setUser } = useAuth(); // Pega o usuário do contexto
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    sessionStorage.clear(); // Limpa todas as informações do usuário do sessionStorage
    setUser(null); // Reseta o estado do usuário no contexto
    router.push("/"); // Redireciona para a página inicial
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Site de Notícias</h1>
        <ul className="flex gap-4">
          <li>
            <Link href="/" className="hover:text-gray-300">Home</Link>
          </li>
          <li>
            {user ? (
              <>
                <Link href="/admin" className="hover:text-gray-300">{`${user.name}`}</Link> {/* Exibe o nome do usuário */}
              </>
            ) : (
              <Link href="/auth/login" className="hover:text-gray-300">Conectar</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
