// app/admin/categorias/CategoryForm.tsx
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export function CategoryForm({
  categoria,
  onSuccess,
}: {
  categoria?: { id: number; nome: string }
  onSuccess?: () => void
}) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const nome = formData.get("nome")

    try {
      if (categoria) {
        await fetch(`/api/admin/categorias/${categoria.id}`, {
          method: "PUT",
          body: JSON.stringify({ nome }),
        })
      } else {
        await fetch("/api/admin/categorias", {
          method: "POST",
          body: JSON.stringify({ nome }),
        })
      }
      router.refresh()
      onSuccess?.()
    } catch (error) {
      console.error("Erro ao salvar categoria:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        name="nome"
        defaultValue={categoria?.nome}
        placeholder="Nome da categoria"
        required
      />
      <Button disabled={loading}>{loading ? "Salvando..." : "Salvar"}</Button>
    </form>
  )
}