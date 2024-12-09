// src/app/admin/noticias/actions.ts
'use server'
import { prisma } from "@/lib/prisma"

export async function getNoticias() {
 return prisma.noticia.findMany({
   include: {
     categoria: true,
     autor: true
   },
   orderBy: { dataPublicacao: 'desc' }
 })
}

export async function createNoticia(data: {
 titulo: string
 conteudo: string
 categoriaId: number
 autorId: number
}) {
 return prisma.noticia.create({
   data: {
     ...data,
     dataPublicacao: new Date()
   },
   include: {
     categoria: true,
     autor: true
   }
 })
}

export async function updateNoticia(
 id: number,
 data: {
   titulo: string
   conteudo: string
   categoriaId: number
 }
) {
 return prisma.noticia.update({
   where: { id },
   data,
   include: {
     categoria: true,
     autor: true
   }
 })
}

export async function deleteNoticia(id: number) {
 return prisma.noticia.delete({
   where: { id }
 })
}