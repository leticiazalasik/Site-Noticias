// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Criar usuário admin
  const admin = await prisma.usuario.create({
    data: {
      email: 'admin@example.com',
      senha: await bcrypt.hash('123456', 10),
      nome: 'Administrador Paulo'
    }
  })

  // Criar categorias
  const categorias = await prisma.categoria.createMany({
    data: [
      { nome: 'Tecnologia' },
      { nome: 'Esportes' },
      { nome: 'Política' }
    ]
  })

  // Criar notícia exemplo
  const noticia = await prisma.noticia.create({
    data: {
      titulo: 'Primeira Notícia',
      conteudo: 'Conteúdo da primeira notícia',
      autorId: admin.id,
      categoriaId: 1
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })