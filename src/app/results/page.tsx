'use client';

import { useEffect, useState } from 'react';
import { Trophy, TrendingUp, Users, Loader2, Lock, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Nominee {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    voteCount: number;
    percentage: string;
}

interface CategoryResult {
    categoryName: string;
    categoryOrder: number;
    nominees: Nominee[];
    totalVotes: number;
}

interface ResultsData {
    totalVotes: number;
    results: Record<string, CategoryResult>;
}

export default function ResultsPage() {
    const [results, setResults] = useState<ResultsData | null>(null);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isResultsEnabled = () => {
        const currentDate = new Date();
        const enableDate = new Date('2026-01-01T00:00:00');
        return currentDate >= enableDate;
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'golfinho') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Senha incorreta. Tente novamente.');
            setPassword('');
        }
    };

    useEffect(() => {
        if (!isAuthenticated) return;

        setLoading(true);
        fetch('/api/votes/results')
            .then(res => res.json())
            .then(data => {
                setResults(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao carregar resultados:', error);
                setLoading(false);
            });
    }, [isAuthenticated]);

    // Check if results are enabled by date
    if (!isResultsEnabled()) {
        return (
            <div className="min-h-screen relative flex items-center justify-center p-4">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/vampetaco.jpeg"
                        alt="Background"
                        fill
                        className="object-contain"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                </div>

                {/* Modal - Not Available Yet */}
                <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-md w-full">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4">
                            <Calendar className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-3">Resultados Indisponíveis</h2>
                        <p className="text-white/90 text-lg mb-4">
                            Tá ansioso porra?
                        </p>
                        <p className="text-white/70 mb-6">
                            Sugiremos aguardar até o dia <span className="font-bold text-yellow-400">01/01/2026</span> para visualizar os resultados.
                        </p>
                        <Link
                            target="_blank"
                            href="https://www.youtube.com/watch?v=jBwmQMdBpfU"
                            className="inline-block w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold rounded-lg transition-all duration-200"
                        >
                            FODASE QUERO VER OS RESULTADOS
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Show password modal if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen relative flex items-center justify-center p-4">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/vampetaco.jpeg"
                        alt="Background"
                        fill
                        className="object-contain"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                </div>

                {/* Modal - Password */}
                <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-md w-full">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full mb-4">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Área Restrita</h2>
                        <p className="text-white/80">Qual a senha safado?</p>
                    </div>

                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Digite a senha"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                autoFocus
                            />
                            {error && (
                                <p className="mt-2 text-red-400 text-sm">{error}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold rounded-lg transition-all duration-200"
                        >
                            Acessar Resultados
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 text-white animate-spin mx-auto mb-4" />
                    <div className="text-white text-2xl font-semibold">Carregando resultados...</div>
                </div>
            </div>
        );
    }

    if (!results) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
                <div className="text-white text-2xl">Erro ao carregar resultados</div>
            </div>
        );
    }

    const categoriesArray = Object.entries(results.results)
        .map(([slug, data]) => ({ slug, ...data }))
        .sort((a, b) => a.categoryOrder - b.categoryOrder);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mb-6">
                        <Image alt='Golden Gragas' src={'/golden-gragas.png'} width={112} height={112} />
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Resultados da Votação
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-white/80 text-xl">
                        <Users className="w-6 h-6" />
                        <span>Total de votos: {results.totalVotes}</span>
                    </div>
                </div>

                {/* Categories */}
                <div className="space-y-8">
                    {categoriesArray.map((category) => (
                        <div
                            key={category.slug}
                            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                        >
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full text-lg">
                                    {category.categoryOrder}
                                </span>
                                {category.categoryName}
                            </h2>

                            <div className="space-y-4">
                                {category.nominees.map((nominee, index) => {
                                    const isWinner = index === 0 && nominee.voteCount > 0;
                                    return (
                                        <div
                                            key={nominee.id}
                                            className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border ${isWinner
                                                    ? 'border-yellow-400/50 bg-gradient-to-r from-yellow-400/10 to-transparent'
                                                    : 'border-white/10'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                {/* Position */}
                                                <div
                                                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${isWinner
                                                            ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white'
                                                            : 'bg-white/10 text-white/60'
                                                        }`}
                                                >
                                                    {isWinner ? <Trophy className="w-6 h-6" /> : index + 1}
                                                </div>

                                                {/* Image */}
                                                <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-white/10">
                                                    <Image
                                                        src={nominee.imageUrl}
                                                        alt={nominee.name}
                                                        width={64}
                                                        height={64}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                {/* Name and Description */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-xl font-bold text-white mb-1">
                                                        {nominee.name}
                                                    </h3>
                                                    <p className="text-white/60 text-sm line-clamp-1">
                                                        {nominee.description}
                                                    </p>
                                                </div>

                                                {/* Stats */}
                                                <div className="flex-shrink-0 text-right">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <TrendingUp className="w-5 h-5 text-green-400" />
                                                        <span className="text-2xl font-bold text-white">
                                                            {nominee.percentage}%
                                                        </span>
                                                    </div>
                                                    <div className="text-white/60 text-sm">
                                                        {nominee.voteCount} {nominee.voteCount === 1 ? 'voto' : 'votos'}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-500 ${isWinner
                                                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                                                            : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                                                        }`}
                                                    style={{ width: `${nominee.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Category Stats */}
                            <div className="mt-4 pt-4 border-t border-white/10 text-white/60 text-sm">
                                Total de votos nesta categoria: {category.totalVotes}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}