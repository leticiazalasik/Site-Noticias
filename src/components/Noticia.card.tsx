// components/NoticiaCard.tsx
import Link from 'next/link'
import { formatDate } from '@/utils/format'
import type { Noticia, Categoria, Usuario } from '@prisma/client'

type NoticiaComRelacoes = Noticia & {
  categoria: Categoria
  autor: Usuario
}

export default function NoticiaCard({ noticia }: { noticia: NoticiaComRelacoes }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img
        src={`https://picsum.photos/seed/${noticia.id}/400/200`}
        alt={noticia.titulo}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <Link 
          href={`/noticia/${noticia.id}`}
          className="text-xl font-semibold hover:text-blue-600"
        >
          {noticia.titulo}
        </Link>
        
        <div className="mt-2 text-sm text-gray-600">
          <Link 
            href={`/categoria/${noticia.categoriaId}`}
            className="text-blue-500 hover:underline"
          >
            {noticia.categoria.nome}
          </Link>
          <span className="mx-2">•</span>
          {formatDate(noticia.dataPublicacao)}
        </div>
      </div>
    </div>
  )
}