// app/admin/categorias/CategoryList.tsx
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CategoryForm } from "./CategoryForm"
import { useRouter } from "next/navigation"

type Categoria = {
  id: number
  nome: string
}

export function CategoryList({ categorias }: { categorias: Categoria[] }) {
  const [editingCategory, setEditingCategory] = useState<Categoria | null>(null)
  const router = useRouter()

  async function handleDelete(id: number) {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) return

    try {
      await fetch(`/api/admin/categorias/${id}`, {
        method: "DELETE",
      })
      router.refresh()
    } catch (error) {
      console.error("Erro ao excluir categoria:", error)
    }
  }

  return (
    <>
      <div className="space-y-4">
        {categorias.map((categoria) => (
          <Card
            key={categoria.id}
            className="p-4 flex justify-between items-center"
          >
            <span>{categoria.nome}</span>
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={() => setEditingCategory(categoria)}
              >
                Editar
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(categoria.id)}
              >
                Excluir
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog
        open={!!editingCategory}
        onOpenChange={() => setEditingCategory(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Categoria</DialogTitle>
          </DialogHeader>
          {editingCategory && (
            <CategoryForm
              categoria={editingCategory}
              onSuccess={() => setEditingCategory(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}