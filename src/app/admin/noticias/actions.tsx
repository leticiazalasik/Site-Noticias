// src/app/admin/noticias/actions.ts
'use server'  // Indica que esse arquivo contém funções do lado do servidor (Next.js)

import { prisma } from "@/lib/prisma"  // Importa a instância do Prisma para interagir com o banco de dados

// Função para buscar todas as notícias do banco de dados
export async function getNoticias() {
  return prisma.noticia.findMany({
    include: {
      categoria: true,  // Inclui os dados da categoria associada à notícia
      autor: true       // Inclui os dados do autor da notícia
    },
    orderBy: { dataPublicacao: 'desc' }  // Ordena as notícias pela data de publicação, da mais recente para a mais antiga
  })
}

// Função para criar uma nova notícia
export async function createNoticia(data: {
  titulo: string  // Título da notícia
  conteudo: string  // Conteúdo da notícia
  categoriaId: number  // ID da categoria associada
  autorId: number  // ID do autor da notícia
}) {
  return prisma.noticia.create({
    data: {
      ...data,  // Preenche os dados passados para criar a notícia
      dataPublicacao: new Date()  // Define a data de publicação da notícia como a data e hora atuais
    },
    include: {
      categoria: true,  // Inclui a categoria associada à notícia
      autor: true       // Inclui o autor associado à notícia
    }
  })
}

// Função para atualizar uma notícia existente
export async function updateNoticia(
  id: number,  // ID da notícia que será atualizada
  data: {
    titulo: string  // Novo título da notícia
    conteudo: string  // Novo conteúdo da notícia
    categoriaId: number  // ID da nova categoria associada
  }
) {
  return prisma.noticia.update({
    where: { id },  // Encontra a notícia pelo ID
    data,  // Atualiza os dados da notícia
    include: {
      categoria: true,  // Inclui a nova categoria associada
      autor: true       // Inclui o autor associado
    }
  })
}

// Função para excluir uma notícia
export async function deleteNoticia(id: number) {
  return prisma.noticia.delete({
    where: { id }  // Encontra a notícia pelo ID e a exclui
  })
}
