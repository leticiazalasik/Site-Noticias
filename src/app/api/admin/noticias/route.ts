import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authConfig } from "@/auth.config"

export async function POST(request: Request) {
  const session = await getServerSession(authConfig)

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  // Lógica da rota aqui
}
