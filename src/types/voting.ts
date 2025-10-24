export interface VoteData {
    'melhor-filme': number;
    'melhor-ator': number;
    'melhor-atriz': number;
    'melhor-diretor': number;
    'melhor-roteiro': number;
    'melhor-fotografia': number;
    'melhor-trilha': number;
    'melhor-edicao': number;
    'melhor-figurino': number;
    'melhor-efeitos': number;
}

export interface VoteResponse {
    success: boolean;
    voteId?: string;
    message?: string;
    error?: string;
}