// src/app/admin/noticias/NewsForm.tsx
'use client'  // Indica que este componente é executado no lado do cliente
import { useState } from "react"  // Hook para gerenciar o estado do componente
import { Button } from "@/components/ui/button"  // Componente de botão personalizado
import { Input } from "@/components/ui/input"  // Componente de input personalizado
import { Textarea } from "@/components/ui/textarea"  // Componente de textarea personalizado
import { 
  Select,  // Componente Select para escolher uma categoria
  SelectContent,  // Conteúdo do Select, onde as opções são exibidas
  SelectItem,  // Cada item de opção dentro do Select
  SelectTrigger,  // Componente que aciona a exibição do Select
  SelectValue,  // Exibe o valor selecionado no Select
} from "@/components/ui/select"  // Componente de select personalizado
import { useRouter } from "next/navigation"  // Hook de navegação do Next.js
import type { Categoria, Noticia } from "@prisma/client"  // Tipos para Categoria e Notícia do Prisma

// Definindo o tipo NoticiaEdit, que extende o tipo Noticia do Prisma e inclui categoria
type NoticiaEdit = Noticia & {
  categoria: Categoria
}

interface NewsFormProps {
  noticia?: NoticiaEdit  // Se a notícia já existir, passará o objeto noticia
  categorias: Categoria[]  // Lista de categorias disponíveis para o select
  onSuccess?: () => void  // Função callback a ser chamada após sucesso
}

// Componente para formulário de criação ou edição de notícias
export function NewsForm({ noticia, categorias, onSuccess }: NewsFormProps) {
  const [loading, setLoading] = useState(false)  // Estado para controlar o carregamento do formulário
  const router = useRouter()  // Hook para manipular a navegação no Next.js

  // Função de submit do formulário, será chamada ao enviar os dados
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()  // Evita o comportamento padrão de envio do formulário
    setLoading(true)  // Ativa o estado de carregamento

    const formData = new FormData(e.currentTarget)  // Captura os dados do formulário
    const data = {
      titulo: formData.get('titulo'),  // Título da notícia
      conteudo: formData.get('conteudo'),  // Conteúdo da notícia
      categoriaId: parseInt(formData.get('categoriaId') as string)  // ID da categoria selecionada
    }

    try {
      // Se a notícia já existir (edição), faz um PUT. Caso contrário, faz um POST para criação
      if (noticia) {
        await fetch(`/api/admin/noticias/${noticia.id}`, {
          method: 'PUT',
          body: JSON.stringify(data)  // Envia os dados atualizados da notícia
        })
      } else {
        await fetch('/api/admin/noticias', {
          method: 'POST',
          body: JSON.stringify(data)  // Envia os dados para criar uma nova notícia
        })
      }
      router.refresh()  // Recarrega a página após sucesso
      onSuccess?.()  // Chama a função de sucesso se fornecida
    } catch (error) {
      console.error('Erro ao salvar notícia:', error)  // Exibe um erro no console caso algo dê errado
    } finally {
      setLoading(false)  // Desativa o estado de carregamento
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Input para título da notícia */}
      <Input
        name="titulo"
        defaultValue={noticia?.titulo}  // Se for edição, preenche com o título atual
        placeholder="Título da notícia"
        required
      />
      
      {/* Select para escolher a categoria da notícia */}
      <Select name="categoriaId" defaultValue={noticia?.categoriaId.toString()}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione uma categoria" />
        </SelectTrigger>
        <SelectContent>
          {/* Mapeia as categorias para criar as opções no Select */}
          {categorias.map(categoria => (
            <SelectItem 
              key={categoria.id} 
              value={categoria.id.toString()}  // ID da categoria como valor da opção
            >
              {categoria.nome}  {/* Nome da categoria exibido */}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Textarea para conteúdo da notícia */}
      <Textarea
        name="conteudo"
        defaultValue={noticia?.conteudo}  // Se for edição, preenche com o conteúdo atual
        placeholder="Conteúdo da notícia"
        required
        className="min-h-[200px]"  // Estilo para garantir que o campo tenha uma altura mínima
      />

      {/* Botão de envio */}
      <Button disabled={loading}>
        {loading ? 'Salvando...' : 'Salvar'}  {/* Exibe "Salvando..." enquanto carrega */}
      </Button>
    </form>
  )
}
