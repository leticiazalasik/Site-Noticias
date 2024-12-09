// src/app/admin/noticias/NewsList.tsx
'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { NewsForm } from "./NewsForm"
import { useRouter } from "next/navigation"
import type { Noticia, Categoria, Usuario } from "@prisma/client"

type NoticiaComRelacoes = Noticia & {
  categoria: Categoria
  autor: Usuario
}

interface NewsListProps {
  noticias: NoticiaComRelacoes[]
  categorias: Categoria[]
}

export function NewsList({ noticias, categorias }: NewsListProps) {
  const [editingNews, setEditingNews] = useState<NoticiaComRelacoes | null>(null)
  const router = useRouter()

  async function handleDelete(id: number) {
    if (!confirm('Tem certeza que deseja excluir esta notícia?')) return

    try {
      await fetch(`/api/admin/noticias/${id}`, {
        method: 'DELETE'
      })
      router.refresh()
    } catch (error) {
      console.error('Erro ao excluir notícia:', error)
    }
  }

  return (
    <>
      <div className="space-y-4">
        {noticias.map((noticia) => (
          <Card key={noticia.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{noticia.titulo}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {noticia.categoria.nome} • {new Date(noticia.dataPublicacao).toLocaleDateString()}
                </p>
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setEditingNews(noticia)}
                >
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(noticia.id)}
                >
                  Excluir
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog
        open={!!editingNews}
        onOpenChange={() => setEditingNews(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Editar Notícia</DialogTitle>
          </DialogHeader>
          {editingNews && (
            <NewsForm
              noticia={editingNews}
              categorias={categorias}
              onSuccess={() => setEditingNews(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}