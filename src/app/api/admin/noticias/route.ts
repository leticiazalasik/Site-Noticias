import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authConfig } from "@/auth.config"
import { prisma } from "@/lib/prisma"


export async function POST(request: Request) {
  const session = await getServerSession(authConfig)

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const data = await request.json()
    const noticia = await prisma.noticia.create({
      data: {
        ...data,
        autorId: parseInt(session.user.id),
        dataPublicacao: new Date()
      }
    })
    return NextResponse.json(noticia)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar notícia" }, { status: 500 })
  }
}
  
