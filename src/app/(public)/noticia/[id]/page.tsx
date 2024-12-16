// app/noticia/[id]/page.tsx
import { prisma } from "@/lib/prisma"
import { formatDate } from "@/utils/format"
import Link from "next/link"
import { notFound } from "next/navigation"

interface Props {
  params: {
    id: string
  }
}

export default async function NoticiaPage({ params }: Props) {
  const noticia = await prisma.noticia.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      categoria: true,
      autor: true
    }
  })

  if (!noticia) {
    notFound()
  }
  

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{noticia.titulo}</h1>
        
        <div className="mb-6 text-gray-600">
          <Link 
            href={`/categoria/${noticia.categoriaId}`}
            className="text-blue-500 hover:underline"
          >
            {noticia.categoria.nome}
          </Link>
          <span className="mx-2">•</span>
          {formatDate(noticia.dataPublicacao)}
          <span className="mx-2">•</span>
          Por {noticia.autor.nome}
        </div>

        <img
          src={`https://picsum.photos/seed/${noticia.id}/800/400`}
          alt={noticia.titulo}
          className="w-full h-[400px] object-cover rounded-lg mb-6"
        />

        <div className="prose max-w-none">
          {noticia.conteudo}
        </div>
      </article>

      <Link 
            href={`/`}
            className="text-blue-500 hover:underline"
          >
          Voltar
          </Link>
    </main>
  )
}