export default function Header() {
    return (
      <header className="bg-gray-800 text-white p-4 mb-16">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Meu Site</h1>
          <ul className="flex gap-4">
            <li><a href="/" className="hover:text-gray-300">Início</a></li>
            <li><a href="/about" className="hover:text-gray-300">Sobre</a></li>
          </ul>
        </nav>
      </header>
    );
  }