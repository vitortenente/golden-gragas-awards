import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
    try {
        const totalVotes = await prisma.vote.count();

        const nominees = await prisma.nominee.findMany({
            include: {
                category: true
            },
            orderBy: {
                voteCount: 'desc'
            }
        });

        // Agrupar por categoria
        const resultsByCategory = nominees.reduce((acc, nominee) => {
            const categorySlug = nominee.category.slug;
            if (!acc[categorySlug]) {
                acc[categorySlug] = {
                    categoryName: nominee.category.name,
                    nominees: []
                };
            }
            acc[categorySlug].nominees.push({
                id: nominee.id,
                name: nominee.name,
                voteCount: nominee.voteCount,
                percentage: totalVotes > 0
                    ? ((nominee.voteCount / totalVotes) * 100).toFixed(2)
                    : '0'
            });
            return acc;
        }, {} as Record<string, any>);

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