// ============================================
// PRISMA SEED - Popular o banco com dados iniciais
// Arquivo: prisma/seed.ts
// ============================================
// @ts-check
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categoriesData = [
  {
    name: 'Mamãe do Ano',
    slug: 'mamãe',
    description: 'Prêmio para a mamãe do ano',
    order: 1,
    nominees: [
      { id: 1, name: 'Camilla', description: 'Uma épica aventura espacial que redefine o gênero sci-fi', imageUrl: '/nomeados/camillones2.jpeg' },
      { id: 2, name: 'Maíra', description: 'Drama intenso sobre memórias e redenção', imageUrl: '/nomeados/maira.jpeg' },
      { id: 3, name: 'Marilene', description: 'Comédia dramática que emociona e diverte', imageUrl: '/nomeados/marinelson.jpeg' },
      { id: 4, name: 'Mylena', description: 'Thriller psicológico envolvente e surpreendente', imageUrl: '/nomeados/my.jpeg' },
      { id: 5, name: 'Juliana', description: 'Ficção científica com reflexões profundas', imageUrl: '/nomeados/julieina.jpeg' }
    ]
  },
  {
    name: 'Alcoólatra do Ano',
    slug: 'acoolatra',
    description: 'Prêmio para o alcoólatra do ano',
    order: 2,
    nominees: [
      { id: 6, name: 'Kenji', description: 'Performance marcante em "Sombras do Passado"', imageUrl: '/nomeados/kenjolas2.jpeg' },
      { id: 7, name: 'Mylena', description: 'Atuação brilhante em "O Último Horizonte"', imageUrl: '/nomeados/my.jpeg' },
      { id: 8, name: 'Camilla', description: 'Protagonista carismático de "Risos e Lágrimas"', imageUrl: '/nomeados/camillones.jpeg' },
      { id: 9, name: 'Luanzinho', description: 'Interpretação poderosa em "Ecos do Amanhã"', imageUrl: '/nomeados/luanzinho.jpeg' },
      { id: 10, name: 'Vitão', description: 'Destaque em "A Jornada das Estrelas"', imageUrl: '/nomeados/vitao.jpeg' }
    ]
  },
  {
    name: 'Maromba do Ano',
    slug: 'maromba',
    description: 'Prêmio para o maromba do ano',
    order: 3,
    nominees: [
      { id: 11, name: 'Tenente', description: 'Atuação emocionante em "Sombras do Passado"', imageUrl: '/nomeados/tenente.jpeg' },
      { id: 12, name: 'Broizer', description: 'Performance memorável em "Risos e Lágrimas"', imageUrl: '/nomeados/broizer.jpeg' },
      { id: 13, name: 'Jubs', description: 'Protagonista de "O Último Horizonte"', imageUrl: '/nomeados/jubsgil.jpeg' },
      { id: 14, name: 'Luanzinho', description: 'Destaque em "A Jornada das Estrelas"', imageUrl: '/nomeados/luanzinho.jpeg' },
      { id: 15, name: 'Kenji', description: 'Atuação marcante em "Ecos do Amanhã"', imageUrl: '/nomeados/kenjolas2.jpeg' }
    ]
  },
  {
    name: 'Sulistinha de Merda do Ano',
    slug: 'sulistinha-merda',
    description: 'Prêmio para o sulistinha de merda do ano',
    order: 4,
    nominees: [
      { id: 16, name: 'Ricardo', description: 'Direção visionária de "A Jornada das Estrelas"', imageUrl: '/nomeados/ricardo.jpeg' },
      { id: 17, name: 'Luanzinho', description: 'Maestria em "Sombras do Passado"', imageUrl: '/nomeados/luanzinho.jpeg' },
      { id: 18, name: 'Broizer', description: 'Direção criativa de "Risos e Lágrimas"', imageUrl: '/nomeados/broizer.jpeg' },
      { id: 19, name: 'Louise', description: 'Visão única em "O Último Horizonte"', imageUrl: '/nomeados/louise.jpeg' }
    ]
  },
  {
    name: 'Tiltadinho do Ano',
    slug: 'tiltadinho',
    description: 'Prêmio para o tiltadinho do ano',
    order: 5,
    nominees: [
      { id: 21, name: 'Kenji', description: 'Roteiro envolvente de "Sombras do Passado"', imageUrl: '/nomeados/kenjolas.jpeg' },
      { id: 22, name: 'Julio', description: 'Narrativa brilhante de "A Jornada das Estrelas"', imageUrl: '/nomeados/jubsgil.jpeg' },
      { id: 23, name: 'Vitao', description: 'Diálogos marcantes em "Risos e Lágrimas"', imageUrl: '/nomeados/vitao.jpeg' },
      { id: 24, name: 'Luanzinho', description: 'Roteiro inteligente de "O Último Horizonte"', imageUrl: '/nomeados/luanzinho.jpeg' },
      { id: 25, name: 'Tenente', description: 'Escrita profunda de "Ecos do Amanhã"', imageUrl: '/nomeados/tenente.jpeg' }
    ]
  },
  {
    name: 'Gamer Cracudo do Ano',
    slug: 'gamer-cracudo',
    description: 'Prêmio para o gamer cracudo do ano',
    order: 6,
    nominees: [
      { id: 26, name: 'Ricardo', description: 'Imagens deslumbrantes em "A Jornada das Estrelas"', imageUrl: '/nomeados/ricardo.jpeg' },
      { id: 27, name: 'Jubs', description: 'Fotografia atmosférica de "Sombras do Passado"', imageUrl: '/nomeados/jubsgil.jpeg' },
      { id: 28, name: 'Kenji', description: 'Trabalho visual em "O Último Horizonte"', imageUrl: '/nomeados/kenjolas2.jpeg' },
      { id: 29, name: 'Vitinho', description: 'Cinematografia de "Ecos do Amanhã"', imageUrl: '/nomeados/vitinho.jpeg' },
      { id: 30, name: 'Mari', description: 'Imagens vibrantes de "Risos e Lágrimas"', imageUrl: '/nomeados/marinelson.jpeg' }
    ]
  },
  {
    name: 'Primeiro(a) a puxar uns dias na cadeida do Ano',
    slug: 'presidiario',
    description: 'Prêmio para o primeiro(a) a puxar uns dias na cadeida do ano',
    order: 7,
    nominees: [
      { id: 31, name: 'Vitinho', description: 'Imagens deslumbrantes em "A Jornada das Estrelas"', imageUrl: '/nomeados/vitinho.jpeg' },
      { id: 32, name: 'Mylena', description: 'Fotografia atmosférica de "Sombras do Passado"', imageUrl: '/nomeados/my.jpeg' },
      { id: 33, name: 'Maira', description: 'Trabalho visual em "O Último Horizonte"', imageUrl: '/nomeados/maira.jpeg' },
      { id: 34, name: 'Louise', description: 'Cinematografia de "Ecos do Amanhã"', imageUrl: '/nomeados/louise.jpeg' },
      { id: 35, name: 'Vitao', description: 'Imagens vibrantes de "Risos e Lágrimas"', imageUrl: '/nomeados/vitao.jpeg' }
    ]
  }
];

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar categorias e nomeados
  for (const categoryData of categoriesData) {
    const { nominees, ...category } = categoryData;

    const createdCategory = await prisma.category.create({
      data: category,
      include: {
        nominees: true
      }
    });

    // Criar nominees com IDs específicos
    for (const nominee of nominees) {
      await prisma.nominee.create({
        data: {
          id: nominee.id,
          name: nominee.name,
          description: nominee.description,
          imageUrl: nominee.imageUrl,
          categoryId: createdCategory.id
        }
      });
    }

    console.log(`✅ Categoria criada: ${createdCategory.name} com ${nominees.length} nomeados`);
  }

  console.log('✨ Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
