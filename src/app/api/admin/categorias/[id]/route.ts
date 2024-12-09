// src/app/api/admin/categorias/[id]/route.ts
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authConfig } from "@/auth.config"

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authConfig)
  if (!session) return new NextResponse("Unauthorized", { status: 401 })

  try {
    const { nome } = await request.json()
    const categoria = await prisma.categoria.update({
      where: { id: parseInt(params.id) },
      data: { nome },
    })
    return NextResponse.json(categoria)
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar categoria" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authConfig)
  if (!session) return new NextResponse("Unauthorized", { status: 401 })

  try {
    await prisma.categoria.delete({
      where: { id: parseInt(params.id) },
    })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao excluir categoria" },
      { status: 500 }
    )
  }
}