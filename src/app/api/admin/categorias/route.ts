// src/app/api/admin/categorias/route.ts
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authConfig } from "@/auth.config"

export async function POST(request: Request) {
  const session = await getServerSession(authConfig)
  if (!session) return new NextResponse("Unauthorized", { status: 401 })

  try {
    const { nome } = await request.json()
    const categoria = await prisma.categoria.create({
      data: { nome },
    })
    return NextResponse.json(categoria)
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar categoria" },
      { status: 500 }
    )
  }
}