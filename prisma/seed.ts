// ============================================
// PRISMA SEED - Popular o banco com dados iniciais
// Arquivo: prisma/seed.ts
// ============================================
// @ts-check
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categoriesData = [
  {
    name: 'Melhor Filme',
    slug: 'melhor-filme',
    description: 'Prêmio para o melhor filme do ano',
    order: 1,
    nominees: [
      {
        name: 'A Jornada das Estrelas',
        description: 'Uma épica aventura espacial que redefine o gênero sci-fi',
        imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=400&fit=crop'
      },
      {
        name: 'Sombras do Passado',
        description: 'Drama intenso sobre memórias e redenção',
        imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=400&fit=crop'
      },
      {
        name: 'Risos e Lágrimas',
        description: 'Comédia dramática que emociona e diverte',
        imageUrl: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=300&h=400&fit=crop'
      },
      {
        name: 'O Último Horizonte',
        description: 'Thriller psicológico envolvente e surpreendente',
        imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=400&fit=crop'
      },
      {
        name: 'Ecos do Amanhã',
        description: 'Ficção científica com reflexões profundas',
        imageUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=400&fit=crop'
      }
    ]
  },
  {
    name: 'Melhor Ator',
    slug: 'melhor-ator',
    description: 'Prêmio para o melhor ator protagonista',
    order: 2,
    nominees: [
      {
        name: 'Ricardo Almeida',
        description: 'Performance marcante em "Sombras do Passado"',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop'
      },
      {
        name: 'Carlos Mendes',
        description: 'Atuação brilhante em "O Último Horizonte"',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop'
      },
      {
        name: 'Bruno Santos',
        description: 'Protagonista carismático de "Risos e Lágrimas"',
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop'
      },
      {
        name: 'Felipe Costa',
        description: 'Interpretação poderosa em "Ecos do Amanhã"',
        imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=400&fit=crop'
      },
      {
        name: 'André Silva',
        description: 'Destaque em "A Jornada das Estrelas"',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop'
      }
    ]
  },
  {
    name: 'Melhor Atriz',
    slug: 'melhor-atriz',
    description: 'Prêmio para a melhor atriz protagonista',
    order: 3,
    nominees: [
      {
        name: 'Ana Paula',
        description: 'Atuação emocionante em "Sombras do Passado"',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop'
      },
      {
        name: 'Marina Costa',
        description: 'Performance memorável em "Risos e Lágrimas"',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop'
      },
      {
        name: 'Juliana Reis',
        description: 'Protagonista de "O Último Horizonte"',
        imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop'
      },
      {
        name: 'Beatriz Lima',
        description: 'Destaque em "A Jornada das Estrelas"',
        imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop'
      },
      {
        name: 'Camila Souza',
        description: 'Atuação marcante em "Ecos do Amanhã"',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop'
      }
    ]
  },
  {
    name: 'Melhor Diretor',
    slug: 'melhor-diretor',
    description: 'Prêmio para o melhor diretor',
    order: 4,
    nominees: [
      {
        name: 'Pedro Oliveira',
        description: 'Direção visionária de "A Jornada das Estrelas"',
        imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=400&fit=crop'
      },
      {
        name: 'Lucas Ferreira',
        description: 'Maestria em "Sombras do Passado"',
        imageUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&h=400&fit=crop'
      },
      {
        name: 'Rafael Gomes',
        description: 'Direção criativa de "Risos e Lágrimas"',
        imageUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=300&h=400&fit=crop'
      },
      {
        name: 'Marcos Pereira',
        description: 'Visão única em "O Último Horizonte"',
        imageUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=400&fit=crop'
      },
      {
        name: 'Gabriel Martins',
        description: 'Direção inovadora de "Ecos do Amanhã"',
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=400&fit=crop'
      }
    ]
  },
  {
    name: 'Melhor Roteiro',
    slug: 'melhor-roteiro',
    description: 'Prêmio para o melhor roteiro',
    order: 5,
    nominees: [
      {
        name: 'Fernanda Rocha',
        description: 'Roteiro envolvente de "Sombras do Passado"',
        imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=400&fit=crop'
      },
      {
        name: 'Paula Dias',
        description: 'Narrativa brilhante de "A Jornada das Estrelas"',
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=400&fit=crop'
      },
      {
        name: 'Roberta Lima',
        description: 'Diálogos marcantes em "Risos e Lágrimas"',
        imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop'
      },
      {
        name: 'Carla Mendes',
        description: 'Roteiro inteligente de "O Último Horizonte"',
        imageUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=300&h=400&fit=crop'
      },
      {
        name: 'Daniela Costa',
        description: 'Escrita profunda de "Ecos do Amanhã"',
        imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&h=400&fit=crop'
      }
    ]
  },
  {
    name: 'Melhor Fotografia',
    slug: 'melhor-fotografia',
    description: 'Prêmio para a melhor fotografia',
    order: 6,
    nominees: [
      {
        name: 'Thiago Ribeiro',
        description: 'Imagens deslumbrantes em "A Jornada das Estrelas"',
        imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&h=400&fit=crop'
      },
      {
        name: 'Leonardo Souza',
        description: 'Fotografia atmosférica de "Sombras do Passado"',
        imageUrl: 'https://images.unsplash.com/photo-1590086782792-42dd2350140d?w=300&h=400&fit=crop'
      },
      {
        name: 'Rodrigo Campos',
        description: 'Trabalho visual em "O Último Horizonte"',
        imageUrl: 'https://images.unsplash.com/photo-1563306406-e66174fa3787?w=300&h=400&fit=crop'
      },
      {
        name: 'Fernando Alves',
        description: 'Cinematografia de "Ecos do Amanhã"',
        imageUrl: 'https://images.unsplash.com/photo-1558222218-b7b54eede3f3?w=300&h=400&fit=crop'
      },
      {
        name: 'Gustavo Pinto',
        description: 'Imagens vibrantes de "Risos e Lágrimas"',
        imageUrl: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=300&h=400&fit=crop'
      }
    ]
  },
  {
    name: 'Melhor Trilha Sonora',
    slug: 'melhor-trilha',
    description: 'Prêmio para a melhor trilha sonora',
    order: 7,
    nominees: [
      {
        name: 'Orquestra Sinfônica',
        description: 'Composição épica para "A Jornada das Estrelas"',
        imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=400&fit=crop'
      },
      {
        name: 'Ensemble Moderno',
        description: 'Trilha emocionante de "Sombras do Passado"',
        imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=400&fit=crop'
      },
      {
        name: 'Estúdio Harmonia',
        description: 'Música marcante de "Risos e Lágrimas"',
        imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=400&fit=crop'
      },
      {
        name: 'Coletivo Sonoro',
        description: 'Composição tensa para "O Último Horizonte"',
        imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=400&fit=crop'
      },
      {
        name: 'Grupo Eletrônico',
        description: 'Trilha futurista de "Ecos do Amanhã"',
        imageUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=400&fit=crop'
      }
    ]
  },
  {
    name: 'Melhor Edição',
    slug: 'melhor-edicao',
    description: 'Prêmio para a melhor edição',
    order: 8,
    nominees: [
      {
        name: 'Marta Ferreira',
        description: 'Montagem dinâmica de "A Jornada das Estrelas"',
        imageUrl: 'https://images.unsplash.com/photo-1591084728795-1149f32d9866?w=300&h=400&fit=crop'
      },
      {
        name: 'Renata Santos',
        description: 'Edição precisa de "O Último Horizonte"',
        imageUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=400&fit=crop'
      },
      {
        name: 'Silvia Costa',
        description: 'Montagem fluida de "Sombras do Passado"',
        imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&h=400&fit=crop'
      },
      {
        name: 'Patrícia Lima',
        description: 'Edição criativa de "Risos e Lágrimas"',
        imageUrl: 'https://images.unsplash.com/photo-1513097633097-329a3a64e0d4?w=300&h=400&fit=crop'
      },
      {
        name: 'Luciana Rocha',
        description: 'Trabalho de edição em "Ecos do Amanhã"',
        imageUrl: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=300&h=400&fit=crop'
      }
    ]
  },
  {
    name: 'Melhor Figurino',
    slug: 'melhor-figurino',
    description: 'Prêmio para o melhor figurino',
    order: 9,
    nominees: [
      {
        name: 'Isabela Martins',
        description: 'Figurinos futuristas de "A Jornada das Estrelas"',
        imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop'
      },
      {
        name: 'Gabriela Souza',
        description: 'Vestuário elegante de "Sombras do Passado"',
        imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=400&fit=crop'
      },
      {
        name: 'Amanda Silva',
        description: 'Figurinos contemporâneos de "Risos e Lágrimas"',
        imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=400&fit=crop'
      },
      {
        name: 'Larissa Oliveira',
        description: 'Design de moda em "O Último Horizonte"',
        imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop'
      },
      {
        name: 'Vanessa Alves',
        description: 'Figurinos inovadores de "Ecos do Amanhã"',
        imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=400&fit=crop'
      }
    ]
  },
];

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes (opcional - cuidado em produção!)
  await prisma.nominee.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.vote.deleteMany({});

  console.log('🗑️  Dados antigos removidos');

  // Criar categorias e nomeados
  for (const categoryData of categoriesData) {
    const { nominees, ...category } = categoryData;

    const createdCategory = await prisma.category.create({
      data: {
        ...category,
        nominees: {
          create: nominees
        }
      },
      include: {
        nominees: true
      }
    });

    console.log(`✅ Categoria criada: ${createdCategory.name} com ${createdCategory.nominees.length} nomeados`);
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
