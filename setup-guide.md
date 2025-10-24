# 🚀 Guia Completo de Setup - Sistema de Votação

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Projeto Next.js criado
- Conta em um provedor de banco de dados (escolha um):
  - **Vercel Postgres** (recomendado se hospedar na Vercel)
  - **PlanetScale** (MySQL, plano gratuito generoso)
  - **Supabase** (PostgreSQL, plano gratuito)
  - **Railway** (PostgreSQL/MySQL)

---

## 🎯 Passo 1: Instalar Dependências

```bash
# Prisma e Cliente
npm install prisma @prisma/client

# React Hook Form (se ainda não tiver)
npm install react-hook-form

# Lucide Icons (se ainda não tiver)
npm install lucide-react

# TypeScript tools (dev)
npm install -D ts-node tsx @types/node
```

---

## 🗄️ Passo 2: Configurar Banco de Dados

### Opção A: Vercel Postgres (Recomendado para Vercel)

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Vá em **Storage** → **Create Database** → **Postgres**
3. Copie a `DATABASE_URL` gerada
4. Cole no arquivo `.env`

### Opção B: PlanetScale (MySQL Grátis)

1. Acesse [planetscale.com](https://planetscale.com)
2. Crie conta e database
3. Gere uma senha de conexão
4. Use o formato MySQL no `.env`

### Opção C: Supabase (PostgreSQL Grátis)

1. Acesse [supabase.com](https://supabase.com)
2. Crie novo projeto
3. Vá em **Settings** → **Database**
4. Copie a **Connection String** (modo Session)
5. Cole no `.env`

---

## ⚙️ Passo 3: Inicializar Prisma

```bash
# Inicializar Prisma
npx prisma init
```

Isso cria:
- Pasta `prisma/`
- Arquivo `prisma/schema.prisma`
- Arquivo `.env`

---

## 📝 Passo 4: Configurar Schema do Prisma

**Arquivo: `prisma/schema.prisma`**

Substitua todo o conteúdo pelo schema fornecido no artifact "Setup Completo - Next.js + Prisma"

---

## 🔐 Passo 5: Configurar Variáveis de Ambiente

**Arquivo: `.env`**

```env
# Escolha UM dos formatos abaixo:

# PostgreSQL (Vercel, Supabase, Railway)
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# MySQL (PlanetScale)
DATABASE_URL="mysql://user:password@host:3306/database"
```

**IMPORTANTE:** Adicione `.env` no `.gitignore`!

---

## 🔨 Passo 6: Criar Estrutura do Banco

```bash
# Gerar cliente do Prisma
npx prisma generate

# Criar tabelas no banco (primeira vez)
npx prisma db push

# OU criar migration (recomendado para produção)
npx prisma migrate dev --name init
```

---

## 📂 Passo 7: Criar Estrutura de Arquivos

### 7.1 - Prisma Client Singleton

**Arquivo: `lib/prisma.ts`**

Cole o código do artifact "Setup Completo - Next.js + Prisma"

### 7.2 - API Route de Votação

**App Router (Next.js 13+):**
- Arquivo: `app/api/votes/route.ts`

**Pages Router (Next.js 12):**
- Arquivo: `pages/api/votes.ts`

Cole o código correspondente do artifact

### 7.3 - API Route de Resultados

**Arquivo: `app/api/votes/results/route.ts`**

Cole o código do artifact

---

## 🌱 Passo 8: Popular Banco com Dados Iniciais

### 8.1 - Criar arquivo de Seed

**Arquivo: `prisma/seed.ts`**

Cole o código do artifact "Seed do Prisma - Popular Banco"

### 8.2 - Configurar package.json

Adicione no `package.json`:

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  },
  "scripts": {
    "db:seed": "prisma db seed",
    "db:reset": "prisma migrate reset",
    "db:studio": "prisma studio"
  }
}
```

### 8.3 - Executar Seed

```bash
npm run db:seed
```

---

## 🎨 Passo 9: Adicionar Componente de Votação

### 9.1 - Criar página

**App Router:**
- Arquivo: `app/voting/page.tsx`

**Pages Router:**
- Arquivo: `pages/voting.tsx`

```tsx
import VotingSystem from '@/components/VotingSystem';

export default function VotingPage() {
  return <VotingSystem />;
}
```

### 9.2 - Criar componente

**Arquivo: `components/VotingSystem.tsx`**

Cole o código do artifact "Sistema de Votação - Competição"

---

## 🧪 Passo 10: Testar o Sistema

```bash
# Rodar projeto
npm run dev

# Abrir no navegador
http://localhost:3000/voting
```

### Testes recomendados:

1. ✅ Votar em todas as 10 categorias
2. ✅ Tentar enviar sem votar em todas (deve bloquear)
3. ✅ Verificar mensagem de sucesso
4. ✅ Testar em mobile (responsivo)
5. ✅ Verificar banco de dados:
   ```bash
   npx prisma studio
   ```

---

## 🔍 Passo 11: Visualizar Banco de Dados

```bash
# Abrir Prisma Studio (interface visual)
npx prisma studio
```

Acesse: http://localhost:5555

Aqui você pode:
- Ver todos os votos
- Ver categorias e nomeados
- Editar dados manualmente
- Deletar registros

---

## 📊 Passo 12: Implementar Página de Resultados (Opcional)

**Arquivo: `app/results/page.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';

export default function ResultsPage() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/votes/results')
      .then(res => res.json())
      .then(data => {
        setResults(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Carregando resultados...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Resultados da Votação
      </h1>
      <p className="text-xl mb-8">
        Total de votos: {results.totalVotes}
      </p>
      
      {Object.entries(results.results).map(([slug, data]) => (
        <div key={slug} className="mb-8 bg-white rounded-lg p-6 shadow">
          <h2 className="text-2xl font-semibold mb-4">
            {data.categoryName}
          </h2>
          {data.nominees.map(nominee => (
            <div key={nominee.id} className="mb-2 flex justify-between">
              <span>{nominee.name}</span>
              <span className="font-bold">
                {nominee.voteCount} votos ({nominee.percentage}%)
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

---

## 🚀 Passo 13: Deploy

### Deploy na Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar variáveis de ambiente
vercel env add DATABASE_URL
```

**No dashboard da Vercel:**
1. Vá em **Settings** → **Environment Variables**
2. Adicione `DATABASE_URL` com o valor do seu banco
3. Redeploy o projeto

### Comandos importantes após deploy:

```bash
# Rodar migrations no production
npx prisma migrate deploy

# Ou push direto
npx prisma db push
```

---

## 🛠️ Comandos Úteis

```bash
# Ver logs do Prisma
npx prisma studio

# Resetar banco (CUIDADO!)
npx prisma migrate reset

# Ver status das migrations
npx prisma migrate status

# Criar nova migration
npx prisma migrate dev --name nome_da_migration

# Formatar schema.prisma
npx prisma format

# Gerar novo cliente após mudanças
npx prisma generate
```

---

## 🐛 Troubleshooting

### Erro: "Can't reach database server"
- Verifique se a `DATABASE_URL` está correta
- Verifique se o banco está ativo
- Tente conectar com `npx prisma studio`

### Erro: "Table does not exist"
```bash
npx prisma db push
```

### Erro na importação do Prisma Client
```bash
npx prisma generate
# Reinicie o servidor
```

### Votos não estão salvando
- Verifique console do navegador (Network tab)
- Verifique logs do servidor
- Teste a rota da API diretamente: `POST /api/votes`

---

## 📚 Próximos Passos

1. **Autenticação**: Adicionar login de usuários
2. **Prevenção de fraude**: Implementar CAPTCHA
3. **Email de confirmação**: Enviar email após voto
4. **Dashboard admin**: Painel para ver resultados em tempo real
5. **Export de dados**: Exportar votos em CSV/Excel
6. **Relatórios**: Gráficos e estatísticas avançadas

---

## 🎉 Pronto!

Seu sistema de votação está funcionando! 

**Dúvidas?** Verifique:
- [Documentação do Prisma](https://www.prisma.io/docs)
- [Documentação do Next.js](https://nextjs.org/docs)
- [React Hook Form Docs](https://react-hook-form.com)
