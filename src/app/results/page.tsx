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

    return (<>
    </>
        // <div className="p-8">
        //     <h1 className="text-3xl font-bold mb-6">
        //         Resultados da Votação
        //     </h1>
        //     <p className="text-xl mb-8">
        //         Total de votos: {results?.totalVotes}
        //     </p>

        //     {Object.entries(results?.results).map(([slug, data]) => (
        //         <div key={slug} className="mb-8 bg-white rounded-lg p-6 shadow">
        //             <h2 className="text-2xl font-semibold mb-4">
        //                 {data?.categoryName}
        //             </h2>
        //             {data?.nominees?.map(nominee => (
        //                 <div key={nominee.id} className="mb-2 flex justify-between">
        //                     <span>{nominee.name}</span>
        //                     <span className="font-bold">
        //                         {nominee.voteCount} votos ({nominee.percentage}%)
        //                     </span>
        //                 </div>
        //             ))}
        //         </div>
        //     ))}
        // </div>
    );
}