// components/CategoryNav.tsx
import Link from 'next/link'
import type { Categoria } from '@prisma/client'

export default function CategoryNav({ categorias }: { categorias: Categoria[] }) {
  return (
    <nav className="flex gap-4 overflow-x-auto py-4">
      {categorias.map((categoria) => (
        <Link
          key={categoria.id}
          href={`/categoria/${categoria.id}`}
          className="px-4 py-2 rounded-full  bg-gray-800 text-white whitespace-nowrap"
          >
          {categoria.nome}
        </Link>
      ))}
    </nav>
  )
}