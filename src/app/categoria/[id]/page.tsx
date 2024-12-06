// app/categoria/[id]/page.tsx
import { prisma } from "@/lib/prisma"
import NoticiaCard from "@/components/Noticia.card"
import { notFound } from "next/navigation"

interface Props {
  params: {
    id: string
  }
}

export default async function CategoriaPage({ params }: Props) {

  const { id } = await params
  const categoria = await prisma.categoria.findUnique({
    where: { id: parseInt(id) },
  })

  if (!categoria) {
    notFound()
  }

  const noticias = await prisma.noticia.findMany({
    where: {
      categoriaId: parseInt(params.id)
    },
    include: {
      categoria: true,
      autor: true
    },
    orderBy: {
      dataPublicacao: 'desc'
    }
  })

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">{categoria.nome}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {noticias.map((noticia) => (
          <NoticiaCard key={noticia.id} noticia={noticia} />
        ))}
      </div>
    </main>
  )
}