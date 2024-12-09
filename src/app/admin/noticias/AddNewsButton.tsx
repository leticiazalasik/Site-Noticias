// src/app/admin/noticias/AddNewsButton.tsx
'use client'  // Indica que o componente será executado no lado do cliente
import { useState } from "react"  // Hook para gerenciar o estado do componente
import { Button } from "@/components/ui/button"  // Componente de botão personalizado
import {
  Dialog,  // Componente de diálogo/modal
  DialogContent,  // Conteúdo do diálogo
  DialogHeader,  // Cabeçalho do diálogo
  DialogTitle,  // Título do diálogo
  DialogTrigger,  // Componente que abre o diálogo
} from "@/components/ui/dialog"  // Importando componentes de diálogo
import { NewsForm } from "./NewsForm"  // Componente de formulário para criar ou editar notícias
import type { Categoria } from "@prisma/client"  // Tipo Categoria do Prisma para tipagem de categorias

// Componente de botão para adicionar uma nova notícia
export function AddNewsButton({ categorias }: { categorias: Categoria[] }) {
  const [open, setOpen] = useState(false)  // Estado para controlar a abertura/fechamento do diálogo

  return (
    <Dialog open={open} onOpenChange={setOpen}>  // Dialog controlado, abre quando 'open' for true
      <DialogTrigger asChild>  // O trigger é o botão de adicionar notícia
        <Button>Adicionar Notícia</Button>  // Botão que ativa o diálogo ao ser clicado
      </DialogTrigger>
      <DialogContent className="max-w-3xl">  // Conteúdo do diálogo com largura máxima de 3xl
        <DialogHeader>  // Cabeçalho do diálogo
          <DialogTitle>Nova Notícia</DialogTitle>  // Título do diálogo
        </DialogHeader>
        {/* O formulário de criação de notícia recebe a lista de categorias e uma função de sucesso */}
        <NewsForm categorias={categorias} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
