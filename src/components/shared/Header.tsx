"use client"; // Marque este arquivo como um componente de cliente

import { useAuth } from '@/contexts/AuthProvider'; // Importando o hook useAuth
import Link from 'next/link';

export default function Header() {
  const { user } = useAuth(); // Pega o usuário do contexto

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
              <Link href="/admin" className="hover:text-gray-300">{`${user.name}`}</Link> // Exibe o nome do usuário
            ) : (
              <Link href="/auth/login" className="hover:text-gray-300">Entrar</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

