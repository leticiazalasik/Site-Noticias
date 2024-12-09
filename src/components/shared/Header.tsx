import Link from "next/link";
 
export default function Header() {
    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Site de Notícias</h1>
                <ul className="flex gap-4">
                    <li>
                        <a href="/" className="hover:text-gray-300">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/noticia" className="hover:text-gray-300">
                            Noticias
                        </a>
                    </li>
                    <li>
                        <Link href="/auth/login" className="hover:text-gray-300">
                            Entrar
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}