import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { votes } = body;

        // Validação básica
        if (!votes || typeof votes !== 'object') {
            return NextResponse.json(
                { error: 'Dados de votação inválidos' },
                { status: 400 }
            );
        }

        // Verificar se todas as 7 categorias foram votadas
        const voteKeys = Object.keys(votes);
        if (voteKeys.length !== 7) {
            return NextResponse.json(
                { error: 'Todas as categorias devem ser votadas' },
                { status: 400 }
            );
        }

        // Opcional: Pegar IP do usuário para prevenir votos duplicados
        const forwarded = request.headers.get('x-forwarded-for');
        const realIp = request.headers.get('x-real-ip');
        const ipAddress = forwarded?.split(',')[0] || realIp || 'unknown';

        // Verificar se IP já votou (bloqueio permanente)
        const existingVote = await prisma.vote.findFirst({
            where: {
                ipAddress,
            }
        });

        if (existingVote) {
            return NextResponse.json(
                { error: 'Você já votou. Cada pessoa pode votar apenas uma vez.' },
                { status: 429 }
            );
        }

        // Criar o voto no banco
        const vote = await prisma.vote.create({
            data: {
                votes,
                ipAddress,
            },
        });

        // Atualizar contadores dos nomeados (opcional)
        await updateNomineeVoteCounts(votes);

        return NextResponse.json(
            {
                success: true,
                voteId: vote.id,
                message: 'Voto registrado com sucesso!'
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Erro ao processar voto:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}

// Função auxiliar para atualizar contadores
async function updateNomineeVoteCounts(votes: Record<string, number>) {
    const updatePromises = Object.values(votes).map(nomineeId =>
        prisma.nominee.update({
            where: { id: Number(nomineeId) },
            data: { voteCount: { increment: 1 } }
        }).catch((error) => {
            console.error(`Erro ao atualizar nominee ${nomineeId}:`, error);
            return null;
        })
    );

    await Promise.all(updatePromises);
}