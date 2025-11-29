import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
    try {
        const totalVotes = await prisma.vote.count();

        const nominees = await prisma.nominee.findMany({
            include: {
                category: true
            },
            orderBy: [
                {
                    category: {
                        order: 'asc'
                    }
                },
                {
                    voteCount: 'desc'
                }
            ]
        });

        // Agrupar por categoria e calcular percentuais corretamente
        const resultsByCategory = nominees.reduce((acc, nominee) => {
            const categorySlug = nominee.category.slug;
            if (!acc[categorySlug]) {
                acc[categorySlug] = {
                    categoryName: nominee.category.name,
                    categoryOrder: nominee.category.order,
                    nominees: [],
                    totalCategoryVotes: 0
                };
            }
            acc[categorySlug].nominees.push(nominee);
            acc[categorySlug].totalCategoryVotes += nominee.voteCount;
            return acc;
        }, {} as Record<string, any>);

        // Calcular percentuais por categoria
        Object.keys(resultsByCategory).forEach(categorySlug => {
            const category = resultsByCategory[categorySlug];
            category.nominees = category.nominees.map((nominee: any) => ({
                id: nominee.id,
                name: nominee.name,
                description: nominee.description,
                imageUrl: nominee.imageUrl,
                voteCount: nominee.voteCount,
                percentage: category.totalCategoryVotes > 0
                    ? ((nominee.voteCount / category.totalCategoryVotes) * 100).toFixed(2)
                    : '0.00'
            }));
            // Remover totalCategoryVotes da resposta final (apenas usado internamente)
            category.totalVotes = category.totalCategoryVotes;
            delete category.totalCategoryVotes;
        });

        return NextResponse.json({
            totalVotes,
            results: resultsByCategory
        });

    } catch (error) {
        console.error('Erro ao buscar resultados:', error);
        return NextResponse.json(
            { error: 'Erro ao buscar resultados' },
            { status: 500 }
        );
    }
}