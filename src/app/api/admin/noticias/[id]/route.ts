// src/app/api/admin/noticias/[id]/route.ts
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authConfig } from "@/auth.config"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authConfig)
  if (!session) return new NextResponse("Unauthorized", { status: 401 })

  try {
    const data = await request.json()
    const noticia = await prisma.noticia.update({
      where: { id: parseInt(params.id) },
      data
    })
    return NextResponse.json(noticia)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar notícia" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authConfig)
  if (!session) return new NextResponse("Unauthorized", { status: 401 })

  try {
    await prisma.noticia.delete({
      where: { id: parseInt(params.id) }
    })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir notícia" }, { status: 500 })
  }
}