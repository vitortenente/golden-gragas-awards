// ============================================
// PRISMA RESET VOTES - Resetar apenas os votos
// Arquivo: prisma/reset-votes.ts
// ============================================
// @ts-check
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🗑️  Iniciando reset dos votos...');

  // Deletar todos os votos
  const deletedVotes = await prisma.vote.deleteMany({});
  console.log(`✅ ${deletedVotes.count} votos deletados`);

  // Resetar contadores de votos dos nominees
  const updatedNominees = await prisma.nominee.updateMany({
    data: {
      voteCount: 0
    }
  });
  console.log(`✅ ${updatedNominees.count} nominees com voteCount resetado para 0`);

  console.log('✨ Reset de votos concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao resetar votos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
