// app/page.tsx
import { prisma } from "@/lib/prisma";
import NoticiaCard from "@/components/Noticia.card";
import CategoryNav from "@/components/CategoyNav";
import Pagination from "@/components/Pagination";

export default async function Home({ searchParams }: { searchParams: { page?: string } }) {
  const page = parseInt(searchParams.page || '1', 10);
  const limit = 10;
  const offset = (page - 1) * limit;

  const noticias = await prisma.noticia.findMany({
    skip: offset,
    take: limit,
    orderBy: {
      dataPublicacao: 'desc'
    },
    include: {
      categoria: true,
      autor: true
    }
  });

  const totalNoticias = await prisma.noticia.count();
  const totalPages = Math.ceil(totalNoticias / limit);

  const categorias = await prisma.categoria.findMany();

  return (
    <main className="container mx-auto px-4">
      <CategoryNav categorias={categorias} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {noticias.map((noticia) => (
          <NoticiaCard key={noticia.id} noticia={noticia} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} />
    </main>
  );
}
