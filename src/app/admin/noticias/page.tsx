// src/app/admin/noticias/page.tsx
import { prisma } from "@/lib/prisma"
import { AddNewsButton } from "./AddNewsButton"
import { NewsList } from "./NewsList"

export default async function AdminNoticias() {
  const [noticias, categorias] = await Promise.all([
    prisma.noticia.findMany({
      include: {
        categoria: true,
        autor: true
      },
      orderBy: {
        dataPublicacao: 'desc'
      }
    }),
    prisma.categoria.findMany()
  ])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notícias</h1>
        <AddNewsButton categorias={categorias} />
      </div>
      <NewsList noticias={noticias} categorias={categorias} />
    </div>
  )
}