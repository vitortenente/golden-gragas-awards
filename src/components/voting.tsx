'use client'
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Trophy, CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';

const categories = [
  {
    id: 'mamãe',
    name: 'Mamãe do Ano',
    nominees: [
      { id: 1, name: 'Camilla', image: "/nomeados/camillones2.jpeg", description: 'Uma épica aventura espacial que redefine o gênero sci-fi' },
      { id: 2, name: 'Maíra', image: '/nomeados/maira.jpeg', description: 'Drama intenso sobre memórias e redenção' },
      { id: 3, name: 'Marilene', image: '/nomeados/marinelson.jpeg', description: 'Comédia dramática que emociona e diverte' },
      { id: 4, name: 'Mylena', image: '/nomeados/my.jpeg', description: 'Thriller psicológico envolvente e surpreendente' },
      { id: 5, name: 'Juliana', image: '/nomeados/julieina.jpeg', description: 'Ficção científica com reflexões profundas' }
    ]
  },
  {
    id: 'acoolatra',
    name: 'Alcoólatra do Ano',
    nominees: [
      { id: 6, name: 'Kenji', image: '/nomeados/kenjolas2.jpeg', description: 'Performance marcante em "Sombras do Passado"' },
      { id: 7, name: 'Mylena', image: '/nomeados/my.jpeg', description: 'Atuação brilhante em "O Último Horizonte"' },
      { id: 8, name: 'Camilla', image: '/nomeados/camillones.jpeg', description: 'Protagonista carismático de "Risos e Lágrimas"' },
      { id: 9, name: 'Luanzinho', image: '/nomeados/luanzinho.jpeg', description: 'Interpretação poderosa em "Ecos do Amanhã"' },
      { id: 10, name: 'Vitão', image: '/nomeados/vitao.jpeg', description: 'Destaque em "A Jornada das Estrelas"' }
    ]
  },
  {
    id: 'maromba',
    name: 'Maromba do Ano',
    nominees: [
      { id: 11, name: 'Tenente', image: '/nomeados/tenente.jpeg', description: 'Atuação emocionante em "Sombras do Passado"' },
      { id: 12, name: 'Broizer', image: '/nomeados/broizer.jpeg', description: 'Performance memorável em "Risos e Lágrimas"' },
      { id: 13, name: 'Jubs', image: '/nomeados/jubsgil.jpeg', description: 'Protagonista de "O Último Horizonte"' },
      { id: 14, name: 'Luanzinho', image: '/nomeados/luanzinho.jpeg', description: 'Destaque em "A Jornada das Estrelas"' },
      { id: 15, name: 'Kenji', image: '/nomeados/kenjolas2.jpeg', description: 'Atuação marcante em "Ecos do Amanhã"' }
    ]
  },
  {
    id: 'sulistinha-merda',
    name: 'Sulistinha de Merda do Ano',
    nominees: [
      { id: 16, name: 'Ricardo', image: '/nomeados/ricardo.jpeg', description: 'Direção visionária de "A Jornada das Estrelas"' },
      { id: 17, name: 'Luanzinho', image: '/nomeados/luanzinho.jpeg', description: 'Maestria em "Sombras do Passado"' },
      { id: 18, name: 'Broizer', image: '/nomeados/broizer.jpeg', description: 'Direção criativa de "Risos e Lágrimas"' },
      { id: 19, name: 'Louise', image: '/nomeados/louise.jpeg', description: 'Visão única em "O Último Horizonte"' },
    ]
  },
  {
    id: 'tiltadinho',
    name: 'Tiltadinho do Ano',
    nominees: [
      { id: 21, name: 'Kenji', image: '/nomeados/kenjolas.jpeg', description: 'Roteiro envolvente de "Sombras do Passado"' },
      { id: 22, name: 'Julio', image: '/nomeados/jubsgil.jpeg', description: 'Narrativa brilhante de "A Jornada das Estrelas"' },
      { id: 23, name: 'Vitao', image: '/nomeados/vitao.jpeg', description: 'Diálogos marcantes em "Risos e Lágrimas"' },
      { id: 24, name: 'Luanzinho', image: '/nomeados/luanzinho.jpeg', description: 'Roteiro inteligente de "O Último Horizonte"' },
      { id: 25, name: 'Tenente', image: '/nomeados/tenente.jpeg', description: 'Escrita profunda de "Ecos do Amanhã"' }
    ]
  },
  {
    id: 'gamer-cracudo',
    name: 'Gamer Cracudo do Ano',
    nominees: [
      { id: 26, name: 'Ricardo', image: '/nomeados/ricardo.jpeg', description: 'Imagens deslumbrantes em "A Jornada das Estrelas"' },
      { id: 27, name: 'Jubs', image: '/nomeados/jubsgil.jpeg', description: 'Fotografia atmosférica de "Sombras do Passado"' },
      { id: 28, name: 'Kenji', image: '/nomeados/kenjolas2.jpeg', description: 'Trabalho visual em "O Último Horizonte"' },
      { id: 29, name: 'Vitinho', image: '/nomeados/vitinho.jpeg', description: 'Cinematografia de "Ecos do Amanhã"' },
      { id: 30, name: 'Mari', image: '/nomeados/marinelson.jpeg', description: 'Imagens vibrantes de "Risos e Lágrimas"' }
    ]
  },
  {
    id: 'presidiario',
    name: 'Primeiro(a) a puxar uns dias na cadeida do Ano',
    nominees: [
      { id: 31, name: 'Vitinho', image: '/nomeados/vitinho.jpeg', description: 'Imagens deslumbrantes em "A Jornada das Estrelas"' },
      { id: 32, name: 'Mylena', image: '/nomeados/my.jpeg', description: 'Fotografia atmosférica de "Sombras do Passado"' },
      { id: 33, name: 'Maira', image: '/nomeados/maira.jpeg', description: 'Trabalho visual em "O Último Horizonte"' },
      { id: 34, name: 'Louise', image: '/nomeados/louise.jpeg', description: 'Cinematografia de "Ecos do Amanhã"' },
      { id: 35, name: 'Vitao', image: '/nomeados/vitao.jpeg', description: 'Imagens vibrantes de "Risos e Lágrimas"' }
    ]
  },
];

export default function VotingSystem() {
  const { control, watch, formState: { errors } } = useForm<Record<string, number>>({
    mode: 'onChange',
    defaultValues: categories.reduce((acc, cat) => ({ ...acc, [cat.id]: null }), {})
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null); const [currentCategory, setCurrentCategory] = useState(0);

  const watchedValues = watch();

  const handleSubmitVotes = async () => {
    const allVotesComplete = categories.every(cat => watchedValues[cat.id]);

    if (!allVotesComplete) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          votes: watchedValues
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar votos');
      }

      setSubmitStatus({
        type: 'success',
        message: data.message || 'Seus votos foram registrados com sucesso!'
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Erro ao enviar votos. Tente novamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getVoteCount = () => {
    return Object.values(watchedValues).filter(v => v !== null && v !== undefined).length;
  };

  const scrollToCategory = (index: any) => {
    setCurrentCategory(index);
    const element = document.getElementById(`category-${index}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <div className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* <Trophy className="w-8 h-8 text-yellow-400" /> */}
              <Image alt='Golden Gragas' src={'/golden-gragas.png'} width={42} height={42}  />
              <div>
                <h1 className="text-2xl font-bold text-white">Premiação Gragão de Ouro 2025</h1>
                <p className="text-purple-200 text-sm">Vote nos seus favoritos</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-semibold text-lg">{getVoteCount()}/{categories.length}</div>
              <div className="text-purple-200 text-sm">categorias votadas</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sticky top-24">
              <h2 className="text-white font-semibold mb-4 text-lg">Categorias</h2>
              <nav className="space-y-2">
                {categories.map((cat, idx) => (
                  <button
                    key={cat.id}
                    onClick={() => scrollToCategory(idx)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${currentCategory === idx
                      ? 'bg-purple-500 text-white'
                      : watchedValues[cat.id]
                        ? 'bg-green-500/20 text-green-200 border border-green-400/30'
                        : 'bg-white/5 text-purple-200 hover:bg-white/10'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{cat.name}</span>
                      {watchedValues[cat.id] && (
                        <CheckCircle className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-8">
              {categories.map((category, catIndex) => (
                <div
                  key={category.id}
                  id={`category-${catIndex}`}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {category.name}
                    </h2>
                    <p className="text-purple-200">Escolha seu favorito</p>
                  </div>

                  <Controller
                    name={category.id}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div className="grid md:grid-cols-5 gap-4">
                        {category.nominees.map((nominee) => (
                          <div
                            key={nominee.id}
                            onClick={() => field.onChange(nominee.id)}
                            className={`cursor-pointer group relative overflow-hidden rounded-xl transition-all ${field.value === nominee.id
                              ? 'ring-4 ring-purple-400 scale-[1.02]'
                              : 'hover:scale-[1.01]'
                              }`}
                          >
                            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                              <div className="aspect-[3/4] overflow-hidden">
                                <img
                                  src={nominee.image}
                                  alt={nominee.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                              <div className="p-4">
                                <h3 className="text-white font-semibold text-lg mb-1">
                                  {nominee.name}
                                </h3>
                                {/* <p className="text-purple-200 text-sm">
                                  {nominee.description}
                                </p> */}
                              </div>
                            </div>
                            {field.value === nominee.id && (
                              <div className="absolute top-3 right-3 bg-purple-500 rounded-full p-2">
                                <CheckCircle className="w-5 h-5 text-white" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  />

                  {errors[category.id] && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Por favor, selecione um nomeado nesta categoria
                    </p>
                  )}
                </div>
              ))}

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                {submitStatus && (
                  <div
                    className={`mb-4 p-4 rounded-lg flex items-center gap-3 ${submitStatus.type === 'success'
                      ? 'bg-green-500/20 border border-green-400/30 text-green-200'
                      : 'bg-red-500/20 border border-red-400/30 text-red-200'
                      }`}
                  >
                    {submitStatus.type === 'success' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                    {submitStatus.message}
                  </div>
                )}

                <button
                  onClick={handleSubmitVotes}
                  disabled={isSubmitting || getVoteCount() < categories.length}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando votos...
                    </>
                  ) : (
                    <>
                      <Trophy className="w-5 h-5" />
                      {getVoteCount() < categories.length
                        ? `Votar (${getVoteCount()}/${categories.length} categorias)`
                        : 'Enviar Todos os Votos'}
                    </>
                  )}
                </button>

                {getVoteCount() < categories.length && (
                  <p className="text-center text-purple-200 text-sm mt-3">
                    Você precisa votar em todas as categorias antes de enviar
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}