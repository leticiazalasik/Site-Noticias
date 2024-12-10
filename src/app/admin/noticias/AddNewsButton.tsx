// src/app/admin/noticias/AddNewsButton.tsx
'use client'  
import { useState } from "react" 
import { Button } from "@/components/ui/button" 
import {
  Dialog,  
  DialogContent, 
  DialogHeader,  
  DialogTitle, 
  DialogTrigger,  
} from "@/components/ui/dialog"  
import { NewsForm } from "./NewsForm" 
import type { Categoria } from "@prisma/client"  


export function AddNewsButton({ categorias }: { categorias: Categoria[] }) {
  const [open, setOpen] = useState(false)  

  return (
    <Dialog open={open} onOpenChange={setOpen}> 
      <DialogTrigger asChild>  
        <Button>Adicionar Notícia</Button>  
      </DialogTrigger>
      <DialogContent className="max-w-3xl">  
        <DialogHeader> 
          <DialogTitle>Nova Notícia</DialogTitle>  
        </DialogHeader>
      
        <NewsForm categorias={categorias} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
