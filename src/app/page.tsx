// app/page.tsx
import { prisma } from "@/lib/prisma"
import NoticiaCard from "@/components/Noticia.card"
import CategoryNav from "src/components/CategoyNav"

export default async function Home() {
  const noticias = await prisma.noticia.findMany({
    take: 10,
    orderBy: {
      dataPublicacao: 'desc'
    },
    include: {
      categoria: true,
      autor: true
    }
  })

  const categorias = await prisma.categoria.findMany()

  return (
    <main className="container mx-auto px-4">
      <CategoryNav categorias={categorias} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {noticias.map((noticia) => (
          <NoticiaCard key={noticia.id} noticia={noticia} />
        ))}
      </div>
    </main>
  )
}