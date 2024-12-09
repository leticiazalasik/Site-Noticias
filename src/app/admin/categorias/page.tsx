// app/admin/categorias/page.tsx
import { prisma } from "@/lib/prisma"
import { AddCategoryButton } from "./AddCategoryButton"
import { CategoryList } from "./CategoryList"

export default async function AdminCategorias() {
  const categorias = await prisma.categoria.findMany({
    orderBy: { nome: "asc" },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categorias</h1>
        <AddCategoryButton />
      </div>
      <CategoryList categorias={categorias} />
    </div>
  )
}