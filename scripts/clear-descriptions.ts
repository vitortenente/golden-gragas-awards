import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🗑️  Removendo descrições dos nomeados...');

  const result = await prisma.nominee.updateMany({
    data: {
      description: ''
    }
  });

  console.log(`✅ ${result.count} nomeados atualizados com sucesso!`);
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
